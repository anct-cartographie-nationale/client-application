import { ChangeDetectionStrategy, Component, ElementRef, Inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, delay, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { ASSETS_TOKEN, AssetsConfiguration, SET_TITLE_ACTION, SetTitleAction } from '../../../../root';
import { MarkersPresenter } from '../../../core/presenters';
import { CoordinateursSortPresentation, DEFAULT_SORT } from '../../presenters';
import { CoordinateursRepository } from '../../reporitories';
import { CoordinateursListItemPresentation } from './coordinateurs-list.presentation';
import { CoordinateursListPresenter } from './coordinateurs-list.presenter';

const SCROLL_DELAY: 200 = 200 as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './coordinateurs-list.page.html',
  providers: [
    {
      deps: [CoordinateursRepository],
      provide: CoordinateursListPresenter,
      useClass: CoordinateursListPresenter
    }
  ]
})
export class CoordinateursListPage {
  private _coordinateursSort$: BehaviorSubject<CoordinateursSortPresentation> =
    new BehaviorSubject<CoordinateursSortPresentation>(DEFAULT_SORT);

  public coordinateurs$: Observable<CoordinateursListItemPresentation[]> = this._coordinateursListPresenter.coordinateurs$(
    this._coordinateursSort$.asObservable()
  );

  @ViewChild('container') public container!: ElementRef;

  @ViewChildren('coordinateurLink') coordinateurLinks: QueryList<ElementRef> = new QueryList<ElementRef>();

  public constructor(
    @Inject(ASSETS_TOKEN) public readonly assetsConfiguration: AssetsConfiguration,
    @Inject(SET_TITLE_ACTION) readonly setTitle: SetTitleAction,
    public readonly markersPresenter: MarkersPresenter,
    public readonly route: ActivatedRoute,
    private readonly _coordinateursListPresenter: CoordinateursListPresenter
  ) {
    setTitle(['Liste des coordinateurs']);
  }

  private findElementMatchingId(id: string | null): ElementRef<HTMLElement> | undefined {
    return this.coordinateurLinks.find((element: ElementRef): boolean => element.nativeElement.id === id);
  }

  private scrollTo(target: ElementRef<HTMLElement> | undefined): void {
    target &&
      this.container.nativeElement.scrollTo({
        top: target.nativeElement.getBoundingClientRect().y - this.container.nativeElement.getBoundingClientRect().y,
        behavior: 'smooth'
      });
  }

  private focus(elementRef: ElementRef<HTMLElement> | undefined): void {
    return (
      elementRef != null &&
      this.coordinateurLinks
        .find((element: ElementRef): boolean => element.nativeElement.id === elementRef.nativeElement.id)
        ?.nativeElement.focus()
    );
  }

  public coordinateurSelected$: Observable<string> = this.route.paramMap.pipe(
    delay(0),
    map((paramMap: ParamMap): ElementRef<HTMLElement> | undefined => this.findElementMatchingId(paramMap.get('id'))),
    tap(this.scrollTo.bind(this)),
    delay(SCROLL_DELAY),
    tap(this.focus.bind(this)),
    map((elementRef: ElementRef<HTMLElement> | undefined): string => elementRef?.nativeElement.id ?? '')
  );

  public trackByCoordinateurId = (_: number, coordinateur: CoordinateursListItemPresentation) => coordinateur.id;

  public onSortChange = (sort: CoordinateursSortPresentation): void => {
    this._coordinateursSort$.next(sort);
  };
}

import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, startWith } from 'rxjs';
import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { ASSETS_TOKEN, AssetsConfiguration } from '../../../../root';
import { MarkersPresenter } from '../../../core';
import { coordinateursLayoutProviders } from './coordinateurs.layout.providers';
import { CoordinateurOnMapPresentation } from './coordinateur-on-map.presentation';
import {
  CoordinateursOnMapPresenter,
  countCoordinateursBassinDeVie,
  countCoordinateursDepartementaux
} from './coordinateurs-on-map.presenter';
import { CoordinateursFilterPresentation, DEFAULT_FILTER } from '../../presenters';
import { map } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './coordinateurs.layout.html',
  providers: coordinateursLayoutProviders
})
export class CoordinateursLayout {
  public nombreCoordinateursDepartementaux$: Observable<number> = this._coordinateursOnMapPresenter
    .coordinateurs$()
    .pipe(map(countCoordinateursDepartementaux));
  public nombreCoordinateursBassinDeVie$: Observable<number> = this._coordinateursOnMapPresenter
    .coordinateurs$()
    .pipe(map(countCoordinateursBassinDeVie));
  private _coordinateursFilter$: BehaviorSubject<CoordinateursFilterPresentation> =
    new BehaviorSubject<CoordinateursFilterPresentation>(DEFAULT_FILTER);
  public coordinateursFilter$: Observable<CoordinateursFilterPresentation> = this._coordinateursFilter$.asObservable();

  public coordinateurs$: Observable<CoordinateurOnMapPresentation[]> = this._coordinateursOnMapPresenter.coordinateurs$(
    this._coordinateursFilter$
  );

  public userLocalisation?: Localisation;

  public constructor(
    @Inject(ASSETS_TOKEN) public assetsConfiguration: AssetsConfiguration,
    public readonly markersPresenter: MarkersPresenter,
    public readonly router: Router,
    public readonly route: ActivatedRoute,
    private readonly _coordinateursOnMapPresenter: CoordinateursOnMapPresenter
  ) {}

  public onHighlight = (highlightedId?: string): void => this.markersPresenter.highlight(highlightedId ?? '');

  public onShowDetails = (coordinateur: CoordinateurOnMapPresentation): void => {
    this.router.navigate([coordinateur.id, 'details'], { relativeTo: this.route.parent });
  };

  public onFilterChange = (filter: CoordinateursFilterPresentation): void => {
    this._coordinateursFilter$.next(filter);
  };

  public resetFilters = (): void => {
    this._coordinateursFilter$.next(DEFAULT_FILTER);
  };
}

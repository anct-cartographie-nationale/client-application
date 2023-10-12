import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { LieuMediationNumerique, Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { SET_TITLE_ACTION, SetTitleAction } from '../../../../root';
import { environment } from '../../../../environments/environment';
import {
  LabelsNationauxPresentation,
  LieuxMediationNumeriquePresenter,
  RegionPresentation,
  TypologiePresentation,
  onlyWithLocalisation,
  toFilterFormPresentationFromQuery,
  toLocalisationFromFilterFormPresentation,
  WithLieuxCount
} from '../../../core/presenters';
import { LieuxMediationNumeriqueRepository } from '../../../core/repositories';
import { ActivatedRoute } from '@angular/router';

const toLieuxWithLocalisation = (lieux: LieuMediationNumerique[]) => lieux.filter(onlyWithLocalisation);

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './presentation.page.html',
  providers: [
    {
      deps: [LieuxMediationNumeriqueRepository],
      provide: LieuxMediationNumeriquePresenter,
      useClass: LieuxMediationNumeriquePresenter
    }
  ],
  styleUrls: ['./presentation.page.scss']
})
export class PresentationPage implements AfterViewInit {
  @ViewChild('webinaire') webinaireRef!: ElementRef;
  private _currentSlide$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public currentSlide$: Observable<number> = this._currentSlide$.asObservable();
  public environment: Boolean = environment.production;
  public lieuxMediationNumeriqueTotal$: Observable<LieuMediationNumerique[]> =
    this._lieuxMediationNumeriqueListPresenter.lieuxMediationNumerique$.pipe(map(toLieuxWithLocalisation));

  private _lieuxMediationNumeriqueListPresenterArgs: [Observable<Localisation>] = [
    of(toLocalisationFromFilterFormPresentation(toFilterFormPresentationFromQuery()))
  ];

  public regions$: Observable<WithLieuxCount<RegionPresentation[]>> =
    this._lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByRegion$(
      ...this._lieuxMediationNumeriqueListPresenterArgs
    );

  public typologies$: Observable<TypologiePresentation[]> =
    this._lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByTypologie$(
      ...this._lieuxMediationNumeriqueListPresenterArgs
    );

  public labelsNationaux$: Observable<LabelsNationauxPresentation[]> =
    this._lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByLabelsNationaux$(
      ...this._lieuxMediationNumeriqueListPresenterArgs
    );

  public constructor(
    private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter,
    @Inject(SET_TITLE_ACTION) readonly setTitle: SetTitleAction,
    public readonly _route: ActivatedRoute
  ) {
    setTitle(['Présentation']);
  }

  onSwitchSlide = (value: number): void => {
    this._currentSlide$.next(value);
  };

  onPreviousSlide = (): void => {
    this._currentSlide$.next(this._currentSlide$.value - 1 < 0 ? 3 : this._currentSlide$.value - 1);
  };

  onNextSlide = (): void => {
    this._currentSlide$.next(this._currentSlide$.value + 1 > 3 ? 0 : this._currentSlide$.value + 1);
  };

  public slidesBackground: string[] = ['bg-orientation', 'bg-centralisation', 'bg-actualisation', 'bg-visibilite'];

  onScrollToAnchor = (): void => {
    this.webinaireRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  };

  ngAfterViewInit() {
    if (this._route.snapshot.fragment === 'webinaire') {
      this.webinaireRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }
}

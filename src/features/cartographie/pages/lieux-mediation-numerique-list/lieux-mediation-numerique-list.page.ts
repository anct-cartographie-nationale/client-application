import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ZOOM_LEVEL_TOKEN, ZoomLevelConfiguration } from '@gouvfr-anct/mediation-numerique';
import { combineLatest, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { FEATURES_TOKEN, FeaturesConfiguration } from '../../../../root';
import {
  byCollectiviteTerritorialeNom,
  DepartementPresentation,
  LieuMediationNumerique,
  LieuMediationNumeriquePresentation,
  RegionPresentation
} from '../../../core';
import { MarkersPresenter } from '../../presenters';
import { CartographieLayout } from '../../layouts';

const toLieuxWithLieuToFocus = ([lieux, paramMap]: [LieuMediationNumeriquePresentation[], ParamMap]): [
  LieuMediationNumeriquePresentation[],
  LieuMediationNumeriquePresentation?
] => [lieux, lieux.find((lieu: LieuMediationNumeriquePresentation) => lieu.id === paramMap.get('id'))];

const toLieux = ([lieux]: [
  LieuMediationNumeriquePresentation[],
  LieuMediationNumeriquePresentation?
]): LieuMediationNumeriquePresentation[] => {
  return lieux;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'lieux-mediation-numerique-list.page.html'
})
export class LieuxMediationNumeriqueListPage {
  private _initialZoom: boolean = false;

  private setInitialState = ([_, lieu]: [LieuMediationNumeriquePresentation[], LieuMediationNumeriquePresentation?]): void => {
    this.markersPresenter.select('');
    lieu && !this._initialZoom && this.focusOnLieu(lieu);
    this._initialZoom = true;
  };

  private focusOnLieu(lieu: LieuMediationNumeriquePresentation) {
    this.markersPresenter.focus(lieu.id);
    this.markersPresenter.center(lieu.localisation, 11);
  }

  public lieuxMediationNumerique$: Observable<LieuMediationNumeriquePresentation[]> = combineLatest([
    this.cartographieLayout.lieuxMediationNumerique$,
    this._route.paramMap
  ]).pipe(map(toLieuxWithLieuToFocus), tap(this.setInitialState), map(toLieux));

  public departements$: Observable<DepartementPresentation[]> = combineLatest([
    this.cartographieLayout.departements$,
    this._route.paramMap
  ]).pipe(map(([departements]: [DepartementPresentation[], ParamMap]) => departements.sort(byCollectiviteTerritorialeNom)));

  public regions$: Observable<RegionPresentation[]> = combineLatest([
    this.cartographieLayout.regions$,
    this._route.paramMap
  ]).pipe(map(([regions]: [RegionPresentation[], ParamMap]) => regions.sort(byCollectiviteTerritorialeNom)));

  public constructor(
    @Inject(FEATURES_TOKEN)
    public readonly features: FeaturesConfiguration,
    @Inject(ZOOM_LEVEL_TOKEN)
    private readonly _zoomLevel: ZoomLevelConfiguration,
    private readonly _route: ActivatedRoute,
    public readonly cartographieLayout: CartographieLayout,
    public readonly markersPresenter: MarkersPresenter
  ) {}

  public printPage() {
    window.print();
  }

  public select(lieuMediationNumerique: LieuMediationNumerique) {
    this.markersPresenter.center(lieuMediationNumerique.localisation, this._zoomLevel.userPosition);
    this.markersPresenter.select(lieuMediationNumerique.id);
  }
}

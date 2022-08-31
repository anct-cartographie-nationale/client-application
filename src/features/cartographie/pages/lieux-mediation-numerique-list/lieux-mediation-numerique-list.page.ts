import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ZOOM_LEVEL_TOKEN, ZoomLevelConfiguration } from '@gouvfr-anct/mediation-numerique';
import { combineLatest, Observable, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { FEATURES_TOKEN, FeaturesConfiguration } from '../../../../root';
import {
  departementFromNom,
  DepartementPresentation,
  FilterPresentation,
  LieuMediationNumerique,
  LieuMediationNumeriquePresentation,
  LieuxMediationNumeriquePresenter,
  Localisation,
  NO_LOCALISATION,
  toDepartement,
  toFilterFormPresentationFromQuery,
  toLocalisationFromFilterFormPresentation
} from '../../../core';
import { MarkersPresenter, inLieuxZoomLevel, LIEUX_ZOOM_LEVEL } from '../../presenters';

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

const filteredByDepartementIfExist = (
  departement: DepartementPresentation | undefined,
  lieux: LieuMediationNumeriquePresentation[],
  paramMap: ParamMap
): [LieuMediationNumeriquePresentation[], ParamMap] =>
  departement
    ? [lieux.filter((lieu: LieuMediationNumeriquePresentation) => toDepartement(lieu)?.code === departement.code), paramMap]
    : [lieux, paramMap];

const toLieuxFilteredByDepartement = ([lieux, paramMap]: [LieuMediationNumeriquePresentation[], ParamMap]) =>
  filteredByDepartementIfExist(departementFromNom(paramMap.get('nomDepartement') ?? ''), lieux, paramMap);

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'lieux-mediation-numerique-list.page.html'
})
export class LieuxMediationNumeriqueListPage {
  private _filterPresentation: FilterPresentation = toFilterFormPresentationFromQuery(this._route.snapshot.queryParams);

  private _localisation: Localisation = toLocalisationFromFilterFormPresentation(this._filterPresentation);

  private _initialZoom: boolean = false;

  private setInitialState = ([_, lieu]: [LieuMediationNumeriquePresentation[], LieuMediationNumeriquePresentation?]): void => {
    this.markersPresenter.select('');
    lieu && !this._initialZoom && this.focusOnLieu(lieu);
    this._initialZoom = true;
  };

  private focusOnLieu(lieu: LieuMediationNumeriquePresentation) {
    this.markersPresenter.focus(lieu.id);
    this.markersPresenter.center(lieu.localisation, LIEUX_ZOOM_LEVEL);
  }

  private boundingBox$(): Observable<[Localisation, Localisation]> {
    return this._route.snapshot.paramMap.get('nomDepartement')
      ? of([NO_LOCALISATION, NO_LOCALISATION])
      : this.markersPresenter.boundingBox$;
  }

  public lieuxMediationNumerique$: Observable<LieuMediationNumeriquePresentation[]> = combineLatest([
    this._lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(
      of(this._localisation),
      of(this._filterPresentation),
      new Date(),
      this.boundingBox$()
    ),
    this._route.paramMap
  ]).pipe(map(toLieuxFilteredByDepartement), map(toLieuxWithLieuToFocus), tap(this.setInitialState), map(toLieux));

  public constructor(
    @Inject(FEATURES_TOKEN)
    public readonly features: FeaturesConfiguration,
    @Inject(ZOOM_LEVEL_TOKEN)
    private readonly _zoomLevel: ZoomLevelConfiguration,
    private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter,
    private readonly _route: ActivatedRoute,
    public readonly markersPresenter: MarkersPresenter
  ) {}

  public printPage() {
    window.print();
  }

  public hover(highlightedId?: string) {
    this.markersPresenter.hover(highlightedId ?? '');
  }

  public select(lieuMediationNumerique: LieuMediationNumerique) {
    this.markersPresenter.center(lieuMediationNumerique.localisation, this._zoomLevel.userPosition);
    this.markersPresenter.select(lieuMediationNumerique.id);
  }

  public inLieuxZoomLevel = inLieuxZoomLevel;
}

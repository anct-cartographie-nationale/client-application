import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ZOOM_LEVEL_TOKEN, ZoomLevelConfiguration } from '@gouvfr-anct/mediation-numerique';
import { combineLatest, Observable, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { FEATURES_TOKEN, FeaturesConfiguration } from '../../../../root';
import {
  departementFromNom,
  DepartementPresentation,
  FilterPresentation,
  LieuMediationNumeriquePresentation,
  LieuxMediationNumeriquePresenter,
  NO_LOCALISATION,
  toDepartement,
  toFilterFormPresentationFromQuery,
  toLocalisationFromFilterFormPresentation
} from '../../../core';
import {
  MarkersPresenter,
  inLieuxZoomLevel,
  LIEUX_ZOOM_LEVEL,
  LieuMediationNumeriqueListItemPresentation,
  toLieuxMediationNumeriqueListItemsPresentation
} from '../../presenters';

const toLieuxWithLieuToFocus = ([lieux, paramMap]: [LieuMediationNumeriquePresentation[], ParamMap]): [
  LieuMediationNumeriquePresentation[],
  LieuMediationNumeriquePresentation?
] => [lieux, lieux.find((lieu: LieuMediationNumeriquePresentation) => lieu.id === paramMap.get('id'))];

const shouldSortOnCodePostal = (
  lieuA: LieuMediationNumeriquePresentation,
  lieuB: LieuMediationNumeriquePresentation
): boolean => lieuA.code_postal !== lieuB.code_postal;

const sortOnCodePostal = (lieuA: LieuMediationNumeriquePresentation, lieuB: LieuMediationNumeriquePresentation): number =>
  lieuA.code_postal < lieuB.code_postal ? -1 : 1;

const sortOnNom = (lieuA: LieuMediationNumeriquePresentation, lieuB: LieuMediationNumeriquePresentation): number =>
  lieuA.nom < lieuB.nom ? -1 : 1;

const toLieux =
  (localisation: Localisation) =>
  ([lieux]: [
    LieuMediationNumeriquePresentation[],
    LieuMediationNumeriquePresentation?
  ]): LieuMediationNumeriquePresentation[] => {
    return localisation
      ? lieux
      : lieux.sort((lieuA, lieuB) =>
          shouldSortOnCodePostal(lieuA, lieuB) ? sortOnCodePostal(lieuA, lieuB) : sortOnNom(lieuA, lieuB)
        );
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

const toLocalisationOf = ({ latitude, longitude }: { latitude?: number; longitude?: number }): Localisation =>
  latitude == null || longitude == null ? NO_LOCALISATION : Localisation({ latitude, longitude });

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'lieux-mediation-numerique-list.page.html'
})
export class LieuxMediationNumeriqueListPage {
  private _filterPresentation: FilterPresentation = toFilterFormPresentationFromQuery(this.route.snapshot.queryParams);

  private _localisation: Localisation = toLocalisationFromFilterFormPresentation(this._filterPresentation);

  private _initialZoom: boolean = false;

  private setInitialState = ([_, lieu]: [LieuMediationNumeriquePresentation[], LieuMediationNumeriquePresentation?]): void => {
    this.markersPresenter.select('');
    lieu && !this._initialZoom && this.focusOnLieu(lieu);
    this._initialZoom = true;
  };

  private focusOnLieu(lieu: LieuMediationNumeriquePresentation) {
    this.markersPresenter.focus(lieu.id);
    this.markersPresenter.center(toLocalisationOf(lieu), LIEUX_ZOOM_LEVEL);
  }

  private boundingBox$(): Observable<[Localisation, Localisation]> {
    return this.route.snapshot.paramMap.get('nomDepartement')
      ? of([NO_LOCALISATION, NO_LOCALISATION])
      : this.markersPresenter.boundingBox$;
  }

  public lieuxMediationNumerique$: Observable<LieuMediationNumeriqueListItemPresentation[]> = combineLatest([
    this._lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(
      of(this._localisation),
      of(this._filterPresentation),
      new Date(),
      this.boundingBox$()
    ),
    this.route.paramMap
  ]).pipe(
    map(toLieuxFilteredByDepartement),
    map(toLieuxWithLieuToFocus),
    tap(this.setInitialState),
    map(toLieux(this._localisation)),
    map(toLieuxMediationNumeriqueListItemsPresentation)
  );

  public listOfLieuxWithoutFilters$: Observable<LieuMediationNumeriquePresentation[]> =
    this._lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(
      of(toLocalisationFromFilterFormPresentation(toFilterFormPresentationFromQuery(this.route.snapshot.queryParams))),
      undefined,
      new Date(),
      this.markersPresenter.boundingBox$
    );

  public constructor(
    @Inject(FEATURES_TOKEN)
    public readonly features: FeaturesConfiguration,
    @Inject(ZOOM_LEVEL_TOKEN)
    private readonly _zoomLevel: ZoomLevelConfiguration,
    private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter,
    public readonly route: ActivatedRoute,
    private readonly _router: Router,
    public readonly markersPresenter: MarkersPresenter
  ) {}

  public printPage() {
    window.print();
  }

  public hover(highlightedId?: string) {
    this.markersPresenter.hover(highlightedId ?? '');
  }

  public select(lieu: LieuMediationNumeriqueListItemPresentation) {
    this.markersPresenter.center(toLocalisationOf(lieu), this._zoomLevel.userPosition);
    this.markersPresenter.select(lieu.id);
  }

  public inLieuxZoomLevel = inLieuxZoomLevel;

  public resetFilters(): void {
    this._router.navigate([], { relativeTo: this.route.parent });
  }

  public toQueryString(fromObject: {} = {}): string {
    return new HttpParams({ fromObject }).toString();
  }
}

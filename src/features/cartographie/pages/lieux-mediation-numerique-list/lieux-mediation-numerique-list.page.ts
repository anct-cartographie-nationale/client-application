import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { combineLatest, delay, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LieuMediationNumerique, Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { FEATURES_TOKEN, FeaturesConfiguration, ZOOM_LEVEL_TOKEN, ZoomLevelConfiguration } from '../../../../root';
import {
  byCollectiviteTerritorialeNom,
  departementFromNom,
  DepartementPresentation,
  FilterPresentation,
  LieuMediationNumeriquePresentation,
  LieuxMediationNumeriquePresenter,
  NO_LOCALISATION,
  RegionPresentation,
  toDepartement,
  toFilterFormPresentationFromQuery,
  toLocalisationFromFilterFormPresentation
} from '../../../core';
import { CartographieLayout } from '../../layouts';
import {
  MarkersPresenter,
  inLieuxZoomLevel,
  LieuMediationNumeriqueListItemPresentation,
  toLieuxMediationNumeriqueListItemsPresentation,
  inRegionZoomLevel
} from '../../presenters';

const findLieuToFocus =
  (paramMap: ParamMap) =>
  (lieux: LieuMediationNumerique[]): LieuMediationNumerique | undefined =>
    lieux.find((lieu: LieuMediationNumerique) => lieu.id === paramMap.get('id'));

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
  (lieux: LieuMediationNumeriquePresentation[]): LieuMediationNumeriquePresentation[] => {
    return localisation
      ? lieux
      : lieux.sort((lieuA, lieuB) =>
          shouldSortOnCodePostal(lieuA, lieuB) ? sortOnCodePostal(lieuA, lieuB) : sortOnNom(lieuA, lieuB)
        );
  };

const filteredByDepartementIfExist = (
  departement: DepartementPresentation | undefined,
  lieux: LieuMediationNumeriquePresentation[]
): LieuMediationNumeriquePresentation[] =>
  departement
    ? lieux.filter((lieu: LieuMediationNumeriquePresentation) => toDepartement(lieu)?.code === departement.code)
    : lieux;

const toLieuxFilteredByDepartement = ([lieux, paramMap]: [
  LieuMediationNumeriquePresentation[],
  ParamMap
]): LieuMediationNumeriquePresentation[] =>
  filteredByDepartementIfExist(departementFromNom(paramMap.get('nomDepartement') ?? ''), lieux);

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'lieux-mediation-numerique-list.page.html'
})
export class LieuxMediationNumeriqueListPage implements OnInit {
  private _filterPresentation: FilterPresentation = toFilterFormPresentationFromQuery(this.route.snapshot.queryParams);

  private _localisation: Localisation = toLocalisationFromFilterFormPresentation(this._filterPresentation);

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
    map(toLieux(this._localisation)),
    map(toLieuxMediationNumeriqueListItemsPresentation(new Date()))
  );

  public regions$: Observable<RegionPresentation[]> = this._cartographieLayout.regions$.pipe(
    map((regions: RegionPresentation[]): RegionPresentation[] => [...regions].sort(byCollectiviteTerritorialeNom))
  );

  public listOfLieuxWithoutFilters$: Observable<LieuMediationNumeriquePresentation[]> =
    this._lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(
      of(toLocalisationFromFilterFormPresentation(toFilterFormPresentationFromQuery(this.route.snapshot.queryParams))),
      undefined,
      new Date(),
      this.markersPresenter.boundingBox$
    );

  public filters$: Observable<FilterPresentation> = this.route.queryParams.pipe(map(toFilterFormPresentationFromQuery));

  public lieuSelected$: Observable<LieuMediationNumerique | undefined> =
    this._lieuxMediationNumeriqueListPresenter.lieuxMediationNumerique$.pipe(
      map(findLieuToFocus(this.route.snapshot.paramMap))
    );

  public zoom$: Observable<number> = combineLatest([this.markersPresenter.zoom$, this.lieuSelected$]).pipe(
    delay(0),
    map(([zoom, lieu]: [number, LieuMediationNumerique | undefined]) => {
      lieu && lieu.localisation && this.select(lieu.id, lieu.localisation.latitude, lieu.localisation.longitude);
      return zoom;
    })
  );

  public constructor(
    @Inject(FEATURES_TOKEN)
    public readonly features: FeaturesConfiguration,
    @Inject(ZOOM_LEVEL_TOKEN)
    private readonly _zoomLevel: ZoomLevelConfiguration,
    private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter,
    public readonly route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _cartographieLayout: CartographieLayout,
    public readonly markersPresenter: MarkersPresenter
  ) {}

  public ngOnInit(): void {
    const departement: DepartementPresentation | undefined = departementFromNom(
      this.route.snapshot.paramMap.get('nomDepartement') ?? ''
    );
    departement &&
      inRegionZoomLevel(this.markersPresenter.getZoom()) &&
      this.markersPresenter.center(departement.localisation, departement.zoom);
  }

  public printPage() {
    window.print();
  }

  public hover(highlightedId?: string) {
    this.markersPresenter.highlight(highlightedId ?? '');
  }

  public select(id: string, latitude: number, longitude: number) {
    !inLieuxZoomLevel(this.markersPresenter.getZoom()) &&
      this.markersPresenter.center(Localisation({ latitude, longitude }), this._zoomLevel.userPosition);
    this.markersPresenter.select(id);
  }

  public inLieuxZoomLevel = inLieuxZoomLevel;

  public resetFilters(): void {
    this._router.navigate([], { relativeTo: this.route.parent });
  }

  public toQueryString(fromObject: {} = {}): string {
    return new HttpParams({ fromObject }).toString();
  }
}

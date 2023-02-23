import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject, delay, Observable, of, tap, withLatestFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import {
  departementFromNom,
  regionFromNom,
  DepartementPresentation,
  FilterPresentation,
  LieuMediationNumeriquePresentation,
  LieuxMediationNumeriquePresenter,
  regionFromDepartement,
  RegionPresentation,
  toDepartement,
  toFilterFormPresentationFromQuery,
  toLocalisationFromFilterFormPresentation,
  nearestRegion,
  ifAny,
  openingState,
  FrancePresentation,
  TerritoirePresentation
} from '../../../core';
import {
  LIEUX_ZOOM_LEVEL,
  MarkersPresenter,
  getNextRouteFromZoomLevel,
  shouldNavigateToListPage,
  zoomLevelFromAreaDistance,
  LieuMediationNumeriqueOnMapPresentation,
  DEPARTEMENT_ZOOM_LEVEL,
  CenterView
} from '../../presenters';
import { cartographieLayoutProviders } from './cartographie.layout.providers';
import {
  INITIAL_POSITION_TOKEN,
  InitialPositionConfiguration,
  ZOOM_LEVEL_TOKEN,
  ZoomLevelConfiguration
} from '../../../../root';
import { LngLatBounds, MapLibreEvent } from 'maplibre-gl';

const filteredByDepartementIfExist = (
  departement: DepartementPresentation | undefined,
  lieux: LieuMediationNumeriquePresentation[]
): LieuMediationNumeriquePresentation[] =>
  departement
    ? lieux.filter((lieu: LieuMediationNumeriquePresentation) => toDepartement(lieu)?.code === departement.code)
    : lieux;

const toLieuxFilteredByDepartement = (lieux: LieuMediationNumeriquePresentation[], nomDepartement: string) =>
  filteredByDepartementIfExist(departementFromNom(nomDepartement), lieux);

const toLieuxWithOpeningState =
  (date: Date) =>
  ([lieuxMediationNumerique, centerView]: [
    LieuMediationNumeriquePresentation[],
    CenterView
  ]): LieuMediationNumeriquePresentation[] =>
    centerView.zoomLevel > DEPARTEMENT_ZOOM_LEVEL
      ? lieuxMediationNumerique.map(
          (lieuMediationNumerique: LieuMediationNumeriquePresentation): LieuMediationNumeriquePresentation => ({
            ...lieuMediationNumerique,
            ...ifAny('status', openingState(date)(lieuMediationNumerique.horaires))
          })
        )
      : lieuxMediationNumerique;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cartographie.layout.html',
  providers: cartographieLayoutProviders
})
export class CartographieLayout {
  private _initialZoom: boolean = false;

  private _lieuxMediationNumeriqueListPresenterArgs: [Observable<Localisation>, Observable<FilterPresentation>, Date] = [
    of(toLocalisationFromFilterFormPresentation(toFilterFormPresentationFromQuery(this.route.snapshot.queryParams))),
    this.route.queryParams.pipe(map(toFilterFormPresentationFromQuery)),
    new Date()
  ];

  public lieuxMediationNumerique$: Observable<LieuMediationNumeriqueOnMapPresentation[]> =
    this._lieuxMediationNumeriqueListPresenter
      .lieuxMediationNumeriqueByDistance$(...this._lieuxMediationNumeriqueListPresenterArgs, this.markersPresenter.boundingBox$)
      .pipe(
        map((lieux: LieuMediationNumeriquePresentation[]): LieuMediationNumeriquePresentation[] =>
          toLieuxFilteredByDepartement(lieux, this.getRouteParam('nomDepartement'))
        ),
        withLatestFrom(this.markersPresenter.centerView$),
        map(toLieuxWithOpeningState(new Date())),
        delay(0),
        tap((lieux: LieuMediationNumeriquePresentation[]) => {
          !this._initialZoom && this.setInitialZoom(lieux);
          this._loadingState$.next(false);
          this._initialZoom = true;
        })
      );

  public departements$: Observable<DepartementPresentation[]> = this._lieuxMediationNumeriqueListPresenter
    .lieuxMediationNumeriqueByDepartement$(...this._lieuxMediationNumeriqueListPresenterArgs)
    .pipe(
      delay(0),
      tap(() => this._loadingState$.next(false))
    );

  public regions$: Observable<RegionPresentation[]> = this._lieuxMediationNumeriqueListPresenter
    .lieuxMediationNumeriqueByRegion$(...this._lieuxMediationNumeriqueListPresenterArgs)
    .pipe(
      delay(0),
      tap(() => this._loadingState$.next(false))
    );

  public france$: Observable<FrancePresentation[]> = this._lieuxMediationNumeriqueListPresenter
    .lieuxMediationNumeriqueFrance$(...this._lieuxMediationNumeriqueListPresenterArgs)
    .pipe(
      delay(0),
      tap(() => this._loadingState$.next(false))
    );

  public defaultAddress$: Observable<string | null> = this.route.queryParamMap.pipe(
    map((paramMap: ParamMap) => paramMap.get('address'))
  );

  private _loadingState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public loadingState$: Observable<boolean> = this._loadingState$.asObservable();

  public fromOrientation: boolean = Object.keys(this.route.snapshot.queryParams).length > 0;

  public userLocalisation?: Localisation;

  public constructor(
    private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter,
    public readonly router: Router,
    public readonly route: ActivatedRoute,
    public readonly markersPresenter: MarkersPresenter,
    @Inject(ZOOM_LEVEL_TOKEN)
    private readonly _zoomLevel: ZoomLevelConfiguration,
    @Inject(INITIAL_POSITION_TOKEN)
    private readonly _initialPosition: InitialPositionConfiguration
  ) {}

  public onShowDetails(lieu: LieuMediationNumeriqueOnMapPresentation): void {
    this.router.navigate([lieu.id, 'details'], { relativeTo: this.route.parent, queryParamsHandling: 'preserve' });
    lieu.latitude &&
      lieu.longitude &&
      this.markersPresenter.center(Localisation({ latitude: lieu.latitude, longitude: lieu.longitude }));
    this.markersPresenter.select(lieu.id);
  }

  public onHighlight(highlightedId?: string) {
    this.markersPresenter.hover(highlightedId ?? '');
  }

  public onMapViewUpdated(value: MapLibreEvent<any>): void {
    const localisation: Localisation = Localisation({
      latitude: value.target.getCenter().lat,
      longitude: value.target.getCenter().lng
    });
    this.updateMarkers(value.target.getBounds(), value.target.getZoom(), localisation);
    this.navigateToPageMatchingZoomLevel(value.target.getZoom(), localisation);
  }

  private updateMarkers(bounds: LngLatBounds, zoomLevel: number, localisation: Localisation) {
    this.markersPresenter.center(localisation, zoomLevel);
    this.markersPresenter.boundingBox([
      Localisation({ latitude: bounds.getNorthWest().lat, longitude: bounds.getNorthWest().lng }),
      Localisation({ latitude: bounds.getSouthEast().lat, longitude: bounds.getSouthEast().lng })
    ]);
  }

  private navigateToPageMatchingZoomLevel(zoomLevel: number, localisation: Localisation) {
    const route: string[] = getNextRouteFromZoomLevel(zoomLevel, nearestRegion(localisation).nom);
    shouldNavigateToListPage(route, this.route.children[0]?.children[0]?.routeConfig?.path) &&
      this.router.navigate(route, { relativeTo: this.route.parent, queryParamsHandling: 'preserve' });
  }

  public onShowLieuxInDepartement(departement: TerritoirePresentation): void {
    this.markersPresenter.center(departement.localisation, departement.zoom);
    this.router.navigate(['regions', regionFromDepartement(departement)?.nom, departement.nom], {
      relativeTo: this.route.parent,
      queryParamsHandling: 'preserve'
    });
  }

  public onShowLieuxInRegion(region: TerritoirePresentation): void {
    this.markersPresenter.center(region.localisation, region.zoom);
    this.router.navigate(['regions', region.nom], { relativeTo: this.route.parent, queryParamsHandling: 'preserve' });
  }

  public onShowLieuxInZone(zone: TerritoirePresentation): void {
    this.markersPresenter.center(zone.localisation, zone.zoom);
  }

  public toQueryString(fromObject: {} = {}): string {
    return new HttpParams({ fromObject }).toString();
  }

  private getRouteParam(routeParam: string) {
    return this.route.children[0]?.children[0]?.snapshot.paramMap.get(routeParam) ?? '';
  }

  private getQueryParam(queryParam: string) {
    return this.route.children[0]?.children[0]?.snapshot.queryParamMap.get(queryParam) ?? '';
  }

  private setInitialZoom(lieux: LieuMediationNumeriquePresentation[]) {
    const departement: DepartementPresentation | undefined = departementFromNom(this.getRouteParam('nomDepartement'));
    if (departement) return this.onShowLieuxInDepartement(departement);

    const region: RegionPresentation | undefined = regionFromNom(this.getRouteParam('nomRegion'));
    if (region) return this.onShowLieuxInRegion(region);

    const lieuFound: LieuMediationNumeriquePresentation | undefined = lieux.find(
      (lieu: LieuMediationNumeriquePresentation) => lieu.id === this.getRouteParam('id')
    );
    if (lieuFound?.longitude && lieuFound?.latitude)
      return this.markersPresenter.center(
        Localisation({ latitude: lieuFound.latitude, longitude: lieuFound.longitude }),
        LIEUX_ZOOM_LEVEL
      );

    if (this.getQueryParam('latitude') && this.getQueryParam('longitude')) {
      return this.markersPresenter.center(
        Localisation({ latitude: +this.getQueryParam('latitude'), longitude: +this.getQueryParam('longitude') }),
        zoomLevelFromAreaDistance(+this.getQueryParam('distance'))
      );
    }

    this.navigateToPageMatchingZoomLevel(this._zoomLevel.regular, Localisation(this._initialPosition));
  }
}

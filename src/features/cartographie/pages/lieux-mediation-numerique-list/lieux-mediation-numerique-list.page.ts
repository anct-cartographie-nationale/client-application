import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, combineLatestWith, delay, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LabelNational, LieuMediationNumerique, Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
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
  MarkersPresenter,
  toFilterFormPresentationFromQuery,
  toLocalisationFromFilterFormPresentation
} from '../../../core';
import { CartographieLayout } from '../../layouts';
import {
  inLieuxZoomLevel,
  LieuMediationNumeriqueListItemPresentation,
  toLieuxMediationNumeriqueListItemsPresentation,
  inRegionZoomLevel,
  HubPresentation,
  LabelPresentation,
  labelToDisplayMap
} from '../../presenters';
import { findLieuToFocus, toHub, toLieux, toLieuxFilteredByDepartement } from './lieux-mediation-numerique-list.presentation';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'lieux-mediation-numerique-list.page.html'
})
export class LieuxMediationNumeriqueListPage implements OnInit {
  private _hubToDisplay$: Subject<HubPresentation> = new Subject<HubPresentation>();
  public hubToDisplay$: Observable<HubPresentation> = this._hubToDisplay$.asObservable().pipe(
    combineLatestWith(this._lieuxMediationNumeriqueListPresenter.lieuxMediationNumerique$),
    map(([hub, lieux]: [HubPresentation, LieuMediationNumerique[]]) => ({
      ...hub,
      lieuxCount: lieux.filter((lieu: LieuMediationNumerique) => lieu.source === hub.source).length
    }))
  );

  private _labelToDisplay$: Subject<LabelPresentation> = new Subject<LabelPresentation>();
  public labelToDisplay$: Observable<LabelPresentation> = this._labelToDisplay$.asObservable().pipe(
    combineLatestWith(this._lieuxMediationNumeriqueListPresenter.lieuxMediationNumerique$),
    map(([label, lieux]: [LabelPresentation, LieuMediationNumerique[]]) => ({
      ...label,
      lieuxCount: lieux.filter((lieu: LieuMediationNumerique) => lieu.labels_nationaux?.includes(label.ref)).length
    }))
  );

  private _filterPresentation: FilterPresentation = toFilterFormPresentationFromQuery(this.route.snapshot.queryParams);

  private _localisation: Localisation = toLocalisationFromFilterFormPresentation(this._filterPresentation);

  private _isInitialZoomDone: boolean = false;

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
      lieu &&
        lieu.localisation &&
        !this._isInitialZoomDone &&
        this.select(lieu.id, lieu.localisation.latitude, lieu.localisation.longitude);
      this._isInitialZoomDone = true;
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

  public getDistance(): string {
    return this.route.snapshot.queryParams['distance'];
  }

  public toQueryString(fromObject: {} = {}): string {
    return new HttpParams({ fromObject }).toString();
  }

  public onShowHub(region: RegionPresentation) {
    this._hubToDisplay$.next(toHub(region));
  }

  public onShowLabel(label: LabelNational) {
    const labelPresentation: LabelPresentation | undefined = labelToDisplayMap.get(label);
    labelPresentation && this._labelToDisplay$.next(labelPresentation);
  }
}

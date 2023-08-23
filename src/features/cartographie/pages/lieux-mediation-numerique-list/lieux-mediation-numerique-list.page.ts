import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, combineLatestWith, Observable, of, startWith, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LabelNational, LieuMediationNumerique, Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import {
  ASSETS_TOKEN,
  AssetsConfiguration,
  FEATURES_TOKEN,
  FeaturesConfiguration,
  SET_TITLE_ACTION,
  SetTitleAction,
  ZOOM_LEVEL_TOKEN,
  ZoomLevelConfiguration
} from '../../../../root';
import {
  byCollectiviteTerritorialeNom,
  departementFromNom,
  DepartementPresentation,
  FilterPresentation,
  LieuxMediationNumeriquePresenter,
  RegionPresentation,
  MarkersPresenter,
  toFilterFormPresentationFromQuery,
  toLocalisationFromFilterFormPresentation,
  FilterFormPresentation,
  createFormGroupFromFilterPresentation
} from '../../../core/presenters';
import { NO_LOCALISATION } from '../../../core/models';
import { CartographieLayout } from '../../layouts';
import {
  inLieuxZoomLevel,
  LieuMediationNumeriqueListItemPresentation,
  toLieuxMediationNumeriqueListItemsPresentation,
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

  private _localisation: Localisation = toLocalisationFromFilterFormPresentation(
    toFilterFormPresentationFromQuery(this.route.snapshot.queryParams)
  );

  private _isInitialZoomDone: boolean = false;

  private boundingBox$(): Observable<[Localisation, Localisation]> {
    return this.route.snapshot.paramMap.get('nomDepartement')
      ? of([NO_LOCALISATION, NO_LOCALISATION])
      : this.markersPresenter.boundingBox$;
  }

  public lieuxMediationNumerique$: Observable<LieuMediationNumeriqueListItemPresentation[]> = combineLatest([
    this._lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(
      of(this._localisation),
      this.route.queryParams.pipe(map(toFilterFormPresentationFromQuery)),
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

  public filterForm: FormGroup = createFormGroupFromFilterPresentation(
    toFilterFormPresentationFromQuery(this.route.snapshot.queryParams)
  );

  public filterPresentation$: Observable<FilterFormPresentation> = this.filterForm.valueChanges.pipe(
    startWith<FilterFormPresentation>(toFilterFormPresentationFromQuery(this.route.snapshot.queryParams))
  );

  public filters$: Observable<FilterPresentation> = this.route.queryParams.pipe(map(toFilterFormPresentationFromQuery));

  public lieuSelected$: Observable<LieuMediationNumerique | undefined> =
    this._lieuxMediationNumeriqueListPresenter.lieuxMediationNumerique$.pipe(
      map(findLieuToFocus(this.route.snapshot.paramMap))
    );

  public zoom$: Observable<number> = combineLatest([this.markersPresenter.zoom$, this.lieuSelected$]).pipe(
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
    @Inject(SET_TITLE_ACTION) readonly setTitle: SetTitleAction,
    private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter,
    @Inject(ASSETS_TOKEN) public readonly assetsConfiguration: AssetsConfiguration,
    public readonly route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _cartographieLayout: CartographieLayout,
    public readonly markersPresenter: MarkersPresenter
  ) {}

  public ngOnInit(): void {
    const departement: DepartementPresentation | undefined = departementFromNom(
      this.route.snapshot.paramMap.get('nomDepartement') ?? ''
    );

    if (departement == null) return;
    this.markersPresenter.center(departement.localisation, departement.zoom);
  }

  public printPage(): void {
    window.print();
  }

  public hover(highlightedId?: string): void {
    this.markersPresenter.highlight(highlightedId ?? '');
  }

  public select(id: string, latitude: number, longitude: number): void {
    !inLieuxZoomLevel(this.markersPresenter.getZoom()) &&
      this.markersPresenter.center(Localisation({ latitude, longitude }), this._zoomLevel.userPosition);
    this.markersPresenter.select(id);
  }

  public inLieuxZoomLevel(zoomLevel: number, distance?: string): boolean {
    const departement: DepartementPresentation | undefined = departementFromNom(
      this.route.snapshot.paramMap.get('nomDepartement') ?? ''
    );
    const isInZoomLevel: boolean = inLieuxZoomLevel(zoomLevel, distance);
    isInZoomLevel ? this.setTitle([departement?.nom, 'Liste des lieux']) : this.setTitle(['Regions']);
    return isInZoomLevel;
  }

  public resetFilters(): void {
    this._router.navigate([], { relativeTo: this.route.parent });
  }

  public getDistance(): string {
    return this.route.snapshot.queryParams['distance'];
  }

  public toQueryString(fromObject: {} = {}): string {
    return new HttpParams({ fromObject }).toString();
  }

  public onShowHub(region: RegionPresentation): void {
    this._hubToDisplay$.next(toHub(region));
  }

  public onShowLabel(label: LabelNational): void {
    const labelPresentation: LabelPresentation | undefined = labelToDisplayMap.get(label);
    labelPresentation && this._labelToDisplay$.next(labelPresentation);
  }
}

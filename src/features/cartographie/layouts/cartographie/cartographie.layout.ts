import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { INITIAL_POSITION_TOKEN, ZOOM_LEVEL_TOKEN } from '@gouvfr-anct/mediation-numerique';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of, shareReplay, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { FEATURES_TOKEN, FeaturesConfiguration } from '../../../../root';
import {
  byNomDepartement,
  DepartementPresentation,
  FilterPresentation,
  LieuMediationNumeriquePresentation,
  LieuxMediationNumeriquePresenter,
  LieuxMediationNumeriqueRepository,
  Localisation,
  regionFromDepartement,
  RegionPresentation,
  toDepartement,
  toFilterFormPresentationFromQuery,
  toLocalisationFromFilterFormPresentation
} from '../../../core';
import { MARKERS, MARKERS_TOKEN } from '../../configuration';
import {
  getNextRouteFromZoomLevel,
  LieuxMediationNumeriqueDetailsPresenter,
  MarkersPresenter,
  shouldNavigateToListPage
} from '../../presenters';
import { ViewReset } from '../../directives';
import { BBox } from 'geojson';

const filteredByDepartementIfExist = (
  departement: DepartementPresentation | undefined,
  lieux: LieuMediationNumeriquePresentation[]
): LieuMediationNumeriquePresentation[] =>
  departement
    ? lieux.filter((lieu: LieuMediationNumeriquePresentation) => toDepartement(lieu)?.code === departement.code)
    : lieux;

const toLieuxFilteredByDepartement = (lieux: LieuMediationNumeriquePresentation[], nomDepartement: string) =>
  filteredByDepartementIfExist(byNomDepartement(nomDepartement), lieux);

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cartographie.layout.html',
  providers: [
    {
      deps: [LieuxMediationNumeriqueRepository],
      provide: LieuxMediationNumeriquePresenter,
      useClass: LieuxMediationNumeriquePresenter
    },
    {
      deps: [LieuxMediationNumeriqueRepository],
      provide: LieuxMediationNumeriqueDetailsPresenter,
      useClass: LieuxMediationNumeriqueDetailsPresenter
    },
    {
      provide: MARKERS_TOKEN,
      useValue: MARKERS
    },
    {
      deps: [ZOOM_LEVEL_TOKEN, INITIAL_POSITION_TOKEN],
      provide: MarkersPresenter,
      useClass: MarkersPresenter
    }
  ]
})
export class CartographieLayout implements OnInit {
  private _lieuxMediationNumeriqueListPresenterArgs: [Observable<Localisation>, Observable<FilterPresentation>, Date] = [
    of(toLocalisationFromFilterFormPresentation(toFilterFormPresentationFromQuery(this.route.snapshot.queryParams))),
    this.route.queryParams.pipe(map(toFilterFormPresentationFromQuery)),
    new Date()
  ];

  public lieuxMediationNumerique$: Observable<LieuMediationNumeriquePresentation[]> = this._lieuxMediationNumeriqueListPresenter
    .lieuxMediationNumeriqueByDistance$(...this._lieuxMediationNumeriqueListPresenterArgs, this.markersPresenter.boundingBox$)
    .pipe(
      map((lieux: LieuMediationNumeriquePresentation[]): LieuMediationNumeriquePresentation[] =>
        toLieuxFilteredByDepartement(lieux, this.route.children[0]?.children[0]?.snapshot?.paramMap.get('nomDepartement') ?? '')
      ),
      tap(() => this._loadingState$.next(false)),
      shareReplay()
    );

  public departements$: Observable<DepartementPresentation[]> = this._lieuxMediationNumeriqueListPresenter
    .lieuxMediationNumeriqueByDepartement$(...this._lieuxMediationNumeriqueListPresenterArgs)
    .pipe(
      tap(() => this._loadingState$.next(false)),
      shareReplay()
    );

  public regions$: Observable<RegionPresentation[]> = this._lieuxMediationNumeriqueListPresenter
    .lieuxMediationNumeriqueByRegion$(...this._lieuxMediationNumeriqueListPresenterArgs)
    .pipe(
      tap(() => this._loadingState$.next(false)),
      shareReplay()
    );

  public checkWhyListOfLieuxIsEmpty$: Observable<LieuMediationNumeriquePresentation[]> =
    this._lieuxMediationNumeriqueListPresenter
      .lieuxMediationNumeriqueByDistance$(
        of(toLocalisationFromFilterFormPresentation(toFilterFormPresentationFromQuery(this.route.snapshot.queryParams))),
        undefined,
        new Date(),
        this.markersPresenter.boundingBox$
      )
      .pipe(tap(() => this._loadingState$.next(false)));

  private _loadingState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public loadingState$: Observable<boolean> = this._loadingState$.asObservable();

  public fromOrientation: boolean = Object.keys(this.route.snapshot.queryParams).length > 0;

  public constructor(
    private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter,
    private readonly _router: Router,
    public readonly route: ActivatedRoute,
    @Inject(FEATURES_TOKEN)
    public readonly features: FeaturesConfiguration,
    public readonly markersPresenter: MarkersPresenter
  ) {}

  public ngOnInit(): void {
    this.navigateToPageMatchingZoomLevel(this.markersPresenter.defaultCenterView.zoomLevel);
  }

  public onShowDetails(lieu: LieuMediationNumeriquePresentation): void {
    this._router.navigate([lieu.id, 'details'], { relativeTo: this.route.parent });
    this.markersPresenter.center(lieu.localisation);
    this.markersPresenter.select(lieu.id);
  }

  public onMapViewUpdated({ viewport, zoomLevel }: ViewReset): void {
    this.updateMarkers(viewport, zoomLevel);
    this.navigateToPageMatchingZoomLevel(zoomLevel);
  }

  private updateMarkers([leftLongitude, bottomLatitude, rightLongitude, topLatitude]: BBox, zoomLevel: number) {
    this.markersPresenter.zoomLevel(zoomLevel);
    this.markersPresenter.boundingBox([
      Localisation({ latitude: topLatitude, longitude: leftLongitude }),
      Localisation({ latitude: bottomLatitude, longitude: rightLongitude })
    ]);
  }

  private navigateToPageMatchingZoomLevel(zoomLevel: number) {
    const route: string = getNextRouteFromZoomLevel(zoomLevel);
    const routeConfigPath: string | undefined = this.route.children[0]?.children[0]?.routeConfig?.path;
    shouldNavigateToListPage(route, routeConfigPath) &&
      this._router.navigate([route], { relativeTo: this.route.parent, queryParamsHandling: 'preserve' });
  }

  public onShowLieuxInDepartement(departement: DepartementPresentation) {
    this.markersPresenter.center(departement.localisation, departement.zoom);
    this._router.navigate(['regions', regionFromDepartement(departement)?.nom, departement.nom], {
      relativeTo: this.route.parent,
      queryParamsHandling: 'preserve'
    });
  }

  public onShowLieuxInRegion(region: RegionPresentation) {
    this.markersPresenter.center(region.localisation, region.zoom);
    this._router.navigate(['regions', region.nom], { relativeTo: this.route.parent, queryParamsHandling: 'preserve' });
  }

  public toQueryString(fromObject: {} = {}): string {
    return new HttpParams({ fromObject }).toString();
  }

  public resetFilters(): void {
    this._router.navigate([], { relativeTo: this.route.parent });
  }
}

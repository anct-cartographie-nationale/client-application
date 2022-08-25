import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import {
  INITIAL_POSITION_TOKEN,
  InitialPositionConfiguration,
  ZOOM_LEVEL_TOKEN,
  ZoomLevelConfiguration
} from '@gouvfr-anct/mediation-numerique';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of, Subject, tap } from 'rxjs';
import { Bounds } from 'leaflet';
import {
  DepartementPresentation,
  FilterPresentation,
  LieuMediationNumeriquePresentation,
  LieuxMediationNumeriquePresenter,
  LieuxMediationNumeriqueRepository,
  Localisation,
  RegionPresentation,
  toFilterFormPresentationFromQuery,
  toLocalisationFromFilterFormPresentation
} from '../../../core';
import { MARKERS, MARKERS_TOKEN } from '../../configuration';
import { CenterView, MarkersPresenter } from '../../presenters';
import { ViewReset } from '../../directives';
import { FeaturesConfiguration, FEATURES_TOKEN } from '../../../../root';

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
      provide: MARKERS_TOKEN,
      useValue: MARKERS
    },
    {
      deps: [ZOOM_LEVEL_TOKEN],
      provide: MarkersPresenter,
      useClass: MarkersPresenter
    }
  ]
})
export class CartographieLayout {
  private _localisation: Localisation = toLocalisationFromFilterFormPresentation(
    toFilterFormPresentationFromQuery(this._route.snapshot.queryParams)
  );

  public lieuxMediationNumerique$: Observable<LieuMediationNumeriquePresentation[]> = this._lieuxMediationNumeriqueListPresenter
    .lieuxMediationNumeriqueByDistance$(
      of(this._localisation),
      this._route.queryParams.pipe(map(toFilterFormPresentationFromQuery)),
      new Date(),
      this.markersPresenter.boundingBox$
    )
    .pipe(tap(() => this._loadingState$.next(false)));

  public departements$: Observable<DepartementPresentation[]> = this._lieuxMediationNumeriqueListPresenter
    .lieuxMediationNumeriqueByDepartement$(
      of(this._localisation),
      this._route.queryParams.pipe(map(toFilterFormPresentationFromQuery)),
      new Date(),
      this.markersPresenter.boundingBox$
    )
    .pipe(tap(() => this._loadingState$.next(false)));

  public regions$: Observable<RegionPresentation[]> = this._lieuxMediationNumeriqueListPresenter
    .lieuxMediationNumeriqueByRegion$(
      of(this._localisation),
      this._route.queryParams.pipe(map(toFilterFormPresentationFromQuery)),
      new Date(),
      this.markersPresenter.boundingBox$
    )
    .pipe(tap(() => this._loadingState$.next(false)));

  public readonly defaultCenterView: CenterView = {
    coordinates: Localisation(this._initialPosition),
    zoomLevel: this._zoomLevel.regular
  };

  private _loadingState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public loadingState$: Observable<boolean> = this._loadingState$.asObservable();

  private _mapViewBounds$: Subject<Bounds> = new Subject<Bounds>();
  public mapViewBounds$: Observable<Bounds> = this._mapViewBounds$.asObservable();

  public fromOrientation?: boolean = Object.keys(this._route.snapshot.queryParams).length > 0;

  public constructor(
    @Inject(FEATURES_TOKEN)
    public readonly features: FeaturesConfiguration,
    private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter,
    public readonly markersPresenter: MarkersPresenter,
    public readonly _route: ActivatedRoute,
    private readonly router: Router,
    @Inject(ZOOM_LEVEL_TOKEN)
    private readonly _zoomLevel: ZoomLevelConfiguration,
    @Inject(INITIAL_POSITION_TOKEN)
    private readonly _initialPosition: InitialPositionConfiguration
  ) {}

  public onShowDetails(lieu: LieuMediationNumeriquePresentation): void {
    this.router.navigate([lieu.id, 'details'], { relativeTo: this._route.parent });
    this.markersPresenter.center(lieu.localisation, this._zoomLevel.userPosition);
    this.markersPresenter.select(lieu.id);
  }

  public mapViewUpdated({ viewport: [leftLongitude, bottomLatitude, rightLongitude, topLatitude], zoomLevel }: ViewReset) {
    this.markersPresenter.zoomLevel(zoomLevel);
    this.markersPresenter.boundingBox([
      Localisation({ latitude: topLatitude, longitude: leftLongitude }),
      Localisation({ latitude: bottomLatitude, longitude: rightLongitude })
    ]);
  }

  public toQueryString(fromObject: {} = {}): string {
    return new HttpParams({ fromObject }).toString();
  }

  public resetFilters(): void {
    this.router.navigate([], {
      relativeTo: this._route.parent
    });
  }
}

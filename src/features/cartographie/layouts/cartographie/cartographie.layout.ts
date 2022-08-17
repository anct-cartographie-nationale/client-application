import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  INITIAL_POSITION_TOKEN,
  InitialPositionConfiguration,
  ZOOM_LEVEL_TOKEN,
  ZoomLevelConfiguration
} from '@gouvfr-anct/mediation-numerique';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject, tap } from 'rxjs';
import { Bounds, Point } from 'leaflet';
import {
  FilterPresentation,
  LieuMediationNumeriquePresentation,
  LieuxMediationNumeriquePresenter,
  LieuxMediationNumeriqueRepository,
  Localisation,
  NO_LOCALISATION,
  toFilterFormPresentationFromQuery,
  toLocalisationFromFilterFormPresentation
} from '../../../core';
import { MARKERS, MARKERS_TOKEN } from '../../configuration';
import { CenterView, getBoundFromLocalisations, MarkersPresenter } from '../../presenters';
import { MarkerEvent, ViewReset } from '../../directives';

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
    MarkersPresenter
  ]
})
export class CartographieLayout {
  private _initialZoom: boolean = false;

  private _filterPresentation: FilterPresentation = toFilterFormPresentationFromQuery(this._route.snapshot.queryParams);

  private _localisation: Localisation = toLocalisationFromFilterFormPresentation(this._filterPresentation);

  private _boundingBox$: BehaviorSubject<[Localisation, Localisation]> = new BehaviorSubject<[Localisation, Localisation]>([
    NO_LOCALISATION,
    NO_LOCALISATION
  ]);

  public lieuxMediationNumerique$: Observable<LieuMediationNumeriquePresentation[]> = this._lieuxMediationNumeriqueListPresenter
    .lieuxMediationNumeriqueByDistance$(of(this._localisation), of(this._filterPresentation), new Date(), this._boundingBox$)
    .pipe(
      tap((lieux: LieuMediationNumeriquePresentation[]) => {
        this._loadingState$.next(false);
        !this._initialZoom && this.zoomOnLieuxDisplayedOnMap(lieux);
        this._initialZoom = true;
      })
    );

  private zoomOnLieuxDisplayedOnMap(lieux: LieuMediationNumeriquePresentation[]): void {
    const [topLeftBound, bottomRightBound]: [Localisation, Localisation] = getBoundFromLocalisations(
      lieux.map((lieu: LieuMediationNumeriquePresentation) => lieu.localisation)
    );

    ![topLeftBound, bottomRightBound].includes(NO_LOCALISATION) &&
      this._mapViewBounds$.next(
        new Bounds([
          new Point(topLeftBound.latitude, topLeftBound.longitude),
          new Point(bottomRightBound.latitude, bottomRightBound.longitude)
        ])
      );
  }

  public readonly defaultCenterView: CenterView = {
    coordinates: Localisation({
      latitude: this._initialPosition.latitude,
      longitude: this._initialPosition.longitude
    }),
    zoomLevel: this._zoomLevel.regular
  };

  private _loadingState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public loadingState$: Observable<boolean> = this._loadingState$.asObservable();

  private _mapViewBounds$: Subject<Bounds> = new Subject<Bounds>();
  public mapViewBounds$: Observable<Bounds> = this._mapViewBounds$.asObservable();

  public fromOrientation?: boolean = Object.keys(this._route.snapshot.queryParams).length > 0;

  public constructor(
    private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter,
    public readonly markersPresenter: MarkersPresenter,
    private readonly _route: ActivatedRoute,
    private readonly router: Router,
    @Inject(ZOOM_LEVEL_TOKEN)
    private readonly _zoomLevel: ZoomLevelConfiguration,
    @Inject(INITIAL_POSITION_TOKEN)
    private readonly _initialPosition: InitialPositionConfiguration
  ) {}

  public showDetailStructure(lieuMediationNumeriqueMarkerEvent: MarkerEvent<LieuMediationNumeriquePresentation>): void {
    this.router.navigate([lieuMediationNumeriqueMarkerEvent.markerProperties.id, 'details'], {
      relativeTo: this._route.parent
    });
    this.markersPresenter.focus(lieuMediationNumeriqueMarkerEvent.markerProperties.localisation, this._zoomLevel.userPosition);
    this.markersPresenter.select(lieuMediationNumeriqueMarkerEvent.markerProperties.id);
  }

  public trackByLieuId(_: number, lieu: LieuMediationNumeriquePresentation) {
    return lieu.id;
  }

  public updateMapView({ viewport: [leftLongitude, bottomLatitude, rightLongitude, topLatitude] }: ViewReset) {
    this._boundingBox$.next([
      Localisation({
        latitude: topLatitude,
        longitude: leftLongitude
      }),
      Localisation({
        latitude: bottomLatitude,
        longitude: rightLongitude
      })
    ]);
  }

  resetZoom() {
    this._initialZoom = false;
  }
}

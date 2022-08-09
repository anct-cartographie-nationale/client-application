import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  INITIAL_POSITION_TOKEN,
  InitialPositionConfiguration,
  ZOOM_LEVEL_TOKEN,
  ZoomLevelConfiguration
} from '@gouvfr-anct/mediation-numerique';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject, tap } from 'rxjs';
import {
  getBoundFromLocalisations,
  LieuxMediationNumeriqueListPresenter,
  LieuxMediationNumeriqueRepository,
  MarkersPresenter
} from '../../../../domain';
import {
  FilterPresentation,
  toFilterFormPresentationFromQuery,
  toLocalisationFromFilterFormPresentation
} from '../../../../../orientation/domain/presenters/filter/filter.presenter';
import { Localisation, NO_LOCALISATION } from '../../../../../../models';
import { CenterView } from '../../components/leaflet-map/leaflet-map.presenter';
import { MARKERS, MARKERS_TOKEN } from '../../configuration/marker';
import { LieuMediationNumeriqueListItemPresentation } from '../../../../domain/presenters/lieux-mediation-numerique-list/lieu-mediation-numerique-list-item.presentation';
import { MarkerEvent, ViewReset } from '../../directives';
import { Bounds, Point } from 'leaflet';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cartographie.layout.html',
  providers: [
    {
      deps: [LieuxMediationNumeriqueRepository],
      provide: LieuxMediationNumeriqueListPresenter,
      useClass: LieuxMediationNumeriqueListPresenter
    },
    {
      provide: MARKERS_TOKEN,
      useValue: MARKERS
    },
    MarkersPresenter
  ]
})
export class CartographieLayout {
  private _hasZoomedOnLieuxDisplayedOnMap: boolean = false;

  private _filterPresentation: FilterPresentation = toFilterFormPresentationFromQuery(this._route.snapshot.queryParams);

  private _localisation: Localisation = toLocalisationFromFilterFormPresentation(this._filterPresentation);

  private _boundingBox$: BehaviorSubject<[Localisation, Localisation]> = new BehaviorSubject<[Localisation, Localisation]>([
    NO_LOCALISATION,
    NO_LOCALISATION
  ]);

  public lieuxMediationNumerique$: Observable<LieuMediationNumeriqueListItemPresentation[]> =
    this._lieuxMediationNumeriqueListPresenter
      .lieuxMediationNumeriqueByDistance$(of(this._localisation), of(this._filterPresentation), new Date(), this._boundingBox$)
      .pipe(
        tap(() => this._loadingState$.next(false)),
        tap((lieux: LieuMediationNumeriqueListItemPresentation[]) => this.zoomOnLieuxDisplayedOnMap(lieux))
      );

  private zoomOnLieuxDisplayedOnMap(lieux: LieuMediationNumeriqueListItemPresentation[]): void {
    if (this._hasZoomedOnLieuxDisplayedOnMap) return;

    const localisations: Localisation[] = lieux.map((lieu: LieuMediationNumeriqueListItemPresentation) => lieu.localisation);
    const [topLeftBound, bottomRightBound]: [Localisation, Localisation] = getBoundFromLocalisations(localisations);

    if (!topLeftBound || !bottomRightBound) return;

    this._mapViewBounds$.next(
      new Bounds([
        new Point(topLeftBound.latitude, topLeftBound.longitude),
        new Point(bottomRightBound.latitude, bottomRightBound.longitude)
      ])
    );

    this._hasZoomedOnLieuxDisplayedOnMap = true;
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
    private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter,
    public readonly markersPresenter: MarkersPresenter,
    private readonly _route: ActivatedRoute,
    private readonly router: Router,
    @Inject(ZOOM_LEVEL_TOKEN)
    private readonly _zoomLevel: ZoomLevelConfiguration,
    @Inject(INITIAL_POSITION_TOKEN)
    private readonly _initialPosition: InitialPositionConfiguration
  ) {}

  public showDetailStructure(lieuMediationNumeriqueMarkerEvent: MarkerEvent<LieuMediationNumeriqueListItemPresentation>): void {
    this.router.navigate(['cartographie', lieuMediationNumeriqueMarkerEvent.markerProperties.id]);
    this.markersPresenter.focus(lieuMediationNumeriqueMarkerEvent.markerProperties.localisation, this._zoomLevel.userPosition);
    this.markersPresenter.select(lieuMediationNumeriqueMarkerEvent.markerProperties.id);
  }

  public trackByLieuId(_: number, lieu: LieuMediationNumeriqueListItemPresentation) {
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
}

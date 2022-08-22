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
  DepartementPresentation,
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
import { CenterView, getBoundsFromLocalisations, MarkersPresenter } from '../../presenters';
import { ViewReset } from '../../directives';

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
        !this._initialZoom && this.zoomOnMarkersDisplayedOnMap(lieux);
        this._initialZoom = true;
      })
    );

  public departements$: Observable<DepartementPresentation[]> = this._lieuxMediationNumeriqueListPresenter
    .lieuxMediationNumeriqueByDepartement$(of(this._localisation), of(this._filterPresentation), new Date(), this._boundingBox$)
    .pipe(
      tap((departements: DepartementPresentation[]) => {
        this._loadingState$.next(false);
        !this._initialZoom && this.zoomOnMarkersDisplayedOnMap(departements);
        this._initialZoom = true;
      })
    );

  private zoomOnMarkersDisplayedOnMap(localisations: { localisation: Localisation }[]): void {
    const [northWest, southEast]: [Localisation, Localisation] = getBoundsFromLocalisations(
      localisations.map(({ localisation }: { localisation: Localisation }) => localisation)
    );

    ![northWest, southEast].includes(NO_LOCALISATION) &&
      this._mapViewBounds$.next(
        new Bounds([new Point(northWest.latitude, northWest.longitude), new Point(southEast.latitude, southEast.longitude)])
      );
  }

  public zoomOnLieuxInDepartement(localisation: Localisation): void {
    this.markersPresenter.center(localisation, 11);
  }

  public readonly defaultCenterView: CenterView = {
    coordinates: Localisation(this._initialPosition),
    zoomLevel: this._zoomLevel.regular
  };

  private _loadingState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public loadingState$: Observable<boolean> = this._loadingState$.asObservable();

  private _mapViewBounds$: Subject<Bounds> = new Subject<Bounds>();
  public mapViewBounds$: Observable<Bounds> = this._mapViewBounds$.asObservable();

  private _currentZoomLevel$: BehaviorSubject<number> = new BehaviorSubject<number>(this._zoomLevel.regular);
  public currentZoomLevel$: Observable<number> = this._currentZoomLevel$.asObservable();

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

  public showLieuMediationNumeriqueDetails(lieu: LieuMediationNumeriquePresentation): void {
    this.router.navigate([lieu.id, 'details'], { relativeTo: this._route.parent });
    this.markersPresenter.center(lieu.localisation, this._zoomLevel.userPosition);
    this.markersPresenter.select(lieu.id);
  }

  public mapViewUpdated({ viewport: [leftLongitude, bottomLatitude, rightLongitude, topLatitude], zoomLevel }: ViewReset) {
    this._currentZoomLevel$.next(zoomLevel);
    this._boundingBox$.next([
      Localisation({ latitude: topLatitude, longitude: leftLongitude }),
      Localisation({ latitude: bottomLatitude, longitude: rightLongitude })
    ]);
  }
}

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Localisation, NO_LOCALISATION } from '../../../core';
import { Inject } from '@angular/core';
import {
  INITIAL_POSITION_TOKEN,
  InitialPositionConfiguration,
  ZOOM_LEVEL_TOKEN,
  ZoomLevelConfiguration
} from '@gouvfr-anct/mediation-numerique';

export interface CenterView {
  coordinates: Localisation;
  zoomLevel: number;
}

const isDefinedLocalisation = (topLeftBound: Localisation): boolean => topLeftBound !== NO_LOCALISATION;

const greatestLatitude = (topLeftBound: Localisation, localisation: Localisation) =>
  topLeftBound.latitude > localisation.latitude ? topLeftBound.latitude : localisation.latitude;

const lowestLongitude = (topLeftBound: Localisation, localisation: Localisation) =>
  topLeftBound.longitude < localisation.longitude ? topLeftBound.longitude : localisation.longitude;

const lowestLatitude = (topLeftBound: Localisation, localisation: Localisation) =>
  topLeftBound.latitude < localisation.latitude ? topLeftBound.latitude : localisation.latitude;

const greatestLongitude = (topLeftBound: Localisation, localisation: Localisation) =>
  topLeftBound.longitude > localisation.longitude ? topLeftBound.longitude : localisation.longitude;

const getTopLeftBound = (localisations: Localisation[]) =>
  localisations.reduce(
    (topLeft: Localisation, localisation: Localisation) =>
      Localisation({
        latitude: isDefinedLocalisation(topLeft) ? greatestLatitude(topLeft, localisation) : localisation.latitude,
        longitude: isDefinedLocalisation(topLeft) ? lowestLongitude(topLeft, localisation) : localisation.longitude
      }),
    NO_LOCALISATION
  );

const getBottomRightBound = (localisations: Localisation[]) =>
  localisations.reduce(
    (bottomRight: Localisation, localisation: Localisation) =>
      Localisation({
        latitude: isDefinedLocalisation(bottomRight) ? lowestLatitude(bottomRight, localisation) : localisation.latitude,
        longitude: isDefinedLocalisation(bottomRight) ? greatestLongitude(bottomRight, localisation) : localisation.longitude
      }),
    NO_LOCALISATION
  );

export const getBoundsFromLocalisations = (localisations: Localisation[]): [Localisation, Localisation] => [
  getTopLeftBound(localisations),
  getBottomRightBound(localisations)
];

export class MarkersPresenter {
  private readonly _centerView$: Subject<CenterView> = new Subject<CenterView>();
  public readonly centerView$: Observable<CenterView> = this._centerView$.asObservable();

  private readonly _selected$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public readonly selected$: Observable<string> = this._selected$.asObservable();

  private readonly _focuced: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public readonly focuced$: Observable<string> = this._focuced.asObservable();

  private _boundingBox$: BehaviorSubject<[Localisation, Localisation]> = new BehaviorSubject<[Localisation, Localisation]>([
    NO_LOCALISATION,
    NO_LOCALISATION
  ]);
  public boundingBox$: Observable<[Localisation, Localisation]> = this._boundingBox$.asObservable();

  private _currentZoomLevel$: BehaviorSubject<number> = new BehaviorSubject<number>(this._zoomLevel.regular);
  public currentZoomLevel$: Observable<number> = this._currentZoomLevel$.asObservable();

  public readonly defaultCenterView: CenterView = {
    coordinates: Localisation(this._initialPosition),
    zoomLevel: this._zoomLevel.regular
  };

  public constructor(
    @Inject(ZOOM_LEVEL_TOKEN)
    private readonly _zoomLevel: ZoomLevelConfiguration,
    @Inject(INITIAL_POSITION_TOKEN)
    private readonly _initialPosition: InitialPositionConfiguration
  ) {}

  public boundingBox(boundingBox: [Localisation, Localisation]) {
    this._boundingBox$.next(boundingBox);
  }

  public center(coordinates: Localisation, zoomLevel: number = this._zoomLevel.userPosition) {
    this._centerView$.next({ coordinates, zoomLevel });
  }

  public select(markerId: string) {
    this._selected$.next(markerId);
  }

  public focus(markerId: string) {
    this._focuced.next(markerId);
  }

  public setZoomLevel(zoomLevel: number) {
    this._currentZoomLevel$.next(zoomLevel);
  }
}

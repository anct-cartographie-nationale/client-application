import { Inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import {
  INITIAL_POSITION_TOKEN,
  InitialPositionConfiguration,
  ZOOM_LEVEL_TOKEN,
  ZoomLevelConfiguration
} from '../../../../root';
import { NO_LOCALISATION } from '../../../core';

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
  private readonly _centerView$: BehaviorSubject<CenterView> = new BehaviorSubject<CenterView>({
    coordinates: Localisation(this._initialPosition),
    zoomLevel: this._zoomLevel.regular
  });
  public readonly centerView$: Observable<CenterView> = this._centerView$.asObservable();

  private readonly _selected$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public readonly selected$: Observable<string> = this._selected$.asObservable();

  private readonly _focuced: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public readonly focuced$: Observable<string> = this._focuced.asObservable();

  private readonly _highlighted$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public readonly highlighted$: Observable<string> = this._highlighted$.asObservable();

  private _boundingBox$: BehaviorSubject<[Localisation, Localisation]> = new BehaviorSubject<[Localisation, Localisation]>([
    NO_LOCALISATION,
    NO_LOCALISATION
  ]);
  public boundingBox$: Observable<[Localisation, Localisation]> = this._boundingBox$.asObservable();

  public constructor(
    @Inject(ZOOM_LEVEL_TOKEN)
    private readonly _zoomLevel: ZoomLevelConfiguration,
    @Inject(INITIAL_POSITION_TOKEN)
    private readonly _initialPosition: InitialPositionConfiguration
  ) {}

  public boundingBox(boundingBox: [Localisation, Localisation]) {
    this._boundingBox$.next(boundingBox);
  }

  public center(localisation: Localisation, zoomLevel: number = this._zoomLevel.userPosition) {
    this._centerView$.next({ coordinates: localisation, zoomLevel });
  }

  public select(markerId: string) {
    this._selected$.next(markerId);
  }

  public focus(markerId: string) {
    this._focuced.next(markerId);
  }

  public highlight(markerId: string) {
    this._highlighted$.next(markerId);
  }

  public reset(): void {
    this._centerView$.next({
      coordinates: Localisation(this._initialPosition),
      zoomLevel: this._zoomLevel.regular
    });
  }
}

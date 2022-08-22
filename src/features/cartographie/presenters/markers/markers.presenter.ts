import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Localisation, NO_LOCALISATION } from '../../../core';

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

  public center(coordinates: Localisation, zoomLevel: number) {
    this._centerView$.next({ coordinates, zoomLevel });
  }

  public focus(markerId: string) {
    this._focuced.next(markerId);
  }

  public select(markerId: string) {
    this._selected$.next(markerId);
  }
}

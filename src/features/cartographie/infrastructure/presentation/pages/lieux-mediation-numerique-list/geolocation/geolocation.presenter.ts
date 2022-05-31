import { BehaviorSubject, Observable } from 'rxjs';
import { Coordinates, NO_COORDINATES } from '../../../../../domain';

export interface GeolocationProvider {
  getCurrentPosition: (successCallback: PositionCallback, errorCallback?: PositionErrorCallback) => void;
}

export class GeolocationPresenter {
  private _location$: BehaviorSubject<Coordinates> = new BehaviorSubject<Coordinates>(NO_COORDINATES);
  public location$: Observable<Coordinates> = this._location$.asObservable();

  public locate(geolocationProvider: GeolocationProvider): void {
    geolocationProvider.getCurrentPosition(
      (position: GeolocationPosition): void => this._location$.next(position.coords),
      (error: GeolocationPositionError): void => this._location$.error(error)
    );
  }
}

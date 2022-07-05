import { BehaviorSubject, Observable } from 'rxjs';
import { Localisation, NO_LOCALISATION } from '../../../../../models/localisation/localisation';

export class GeolocationPresenter {
  private _location$: BehaviorSubject<Localisation> = new BehaviorSubject<Localisation>(NO_LOCALISATION);
  public location$: Observable<Localisation> = this._location$.asObservable();

  public setLocalisation(localisation: Localisation) {
    this._location$.next(localisation);
  }
}

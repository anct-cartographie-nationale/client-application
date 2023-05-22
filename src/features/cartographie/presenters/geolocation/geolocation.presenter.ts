import { BehaviorSubject, Observable } from 'rxjs';
import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { NO_LOCALISATION } from '../../../core/models';

export class GeolocationPresenter {
  private _location$: BehaviorSubject<Localisation> = new BehaviorSubject<Localisation>(NO_LOCALISATION);
  public location$: Observable<Localisation> = this._location$.asObservable();

  public setLocalisation(localisation: Localisation) {
    this._location$.next(localisation);
  }
}

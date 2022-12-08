import { Observable } from 'rxjs';
import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { Address } from '../models';

export abstract class AddressRepository {
  public abstract search$(searchTerm: string): Observable<Address[]>;
  public abstract reverse$(localisation: Localisation): Observable<Address[]>;
}

import { Observable } from 'rxjs';
import { Localisation } from '../../core';
import { Address } from '../models';

export abstract class AddressRepository {
  public abstract search$(searchTerm: string): Observable<Address[]>;
  public abstract reverse$(localisation: Localisation): Observable<Address[]>;
}

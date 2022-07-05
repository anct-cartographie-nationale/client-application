import { Observable } from 'rxjs';
import { Address } from '../models';

export abstract class AddressRepository {
  public abstract search$(searchTerm: string): Observable<Address[]>;
}

import { Observable } from 'rxjs';
import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { Address, AddressRepository, AddressType, Searchable } from '../../../adresse';
import { ResultFoundPresentation } from './result-found.presentation';
import { map } from 'rxjs/operators';

const toResultFound = (addresses: Address[]): ResultFoundPresentation<{ type: AddressType }>[] =>
  addresses.map(
    (address: Address): ResultFoundPresentation<{ type: AddressType }> => ({
      context: address.context,
      label: address.label,
      localisation: address.localisation,
      payload: { type: address.type }
    })
  );

export class AddressPresenter implements Searchable {
  public constructor(private readonly _addressRepository: AddressRepository) {}

  public search$(searchTerm: string): Observable<ResultFoundPresentation<{ type: AddressType }>[]> {
    return this._addressRepository.search$(searchTerm).pipe(map(toResultFound));
  }

  public reverse$(localisation: Localisation): Observable<ResultFoundPresentation<{ type: AddressType }>[]> {
    return this._addressRepository.reverse$(localisation).pipe(map(toResultFound));
  }
}

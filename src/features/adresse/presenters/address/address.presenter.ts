import { Observable } from 'rxjs';
import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { AddressRepository } from '../../../adresse';
import { AddressFoundPresentation } from './address-found.presentation';

export class AddressPresenter {
  public constructor(private readonly _addressRepository: AddressRepository) {}

  public search$(searchTerm: string): Observable<AddressFoundPresentation[]> {
    return this._addressRepository.search$(searchTerm);
  }

  public reverse$(localisation: Localisation): Observable<AddressFoundPresentation[]> {
    return this._addressRepository.reverse$(localisation);
  }
}

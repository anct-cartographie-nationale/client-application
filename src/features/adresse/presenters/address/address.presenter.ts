import { Observable } from 'rxjs';
import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { AddressRepository, Searchable } from '../../../adresse';
import { ResultFoundPresentation } from './result-found.presentation';

export class AddressPresenter implements Searchable {
  public constructor(private readonly _addressRepository: AddressRepository) {}

  public search$(searchTerm: string): Observable<ResultFoundPresentation[]> {
    return this._addressRepository.search$(searchTerm);
  }

  public reverse$(localisation: Localisation): Observable<ResultFoundPresentation[]> {
    return this._addressRepository.reverse$(localisation);
  }
}

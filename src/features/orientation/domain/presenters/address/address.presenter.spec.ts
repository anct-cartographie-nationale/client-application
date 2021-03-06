import { AddressPresenter } from './address.presenter';
import { firstValueFrom, Observable, of } from 'rxjs';
import { AddressRepository } from '../../repositories';
import { Address } from '../../models';
import { Localisation } from '../../../../../models/localisation/localisation';
import { AddressFoundPresentation } from './address-found.presentation';

describe('address presenter', (): void => {
  it('should search an address', async (): Promise<void> => {
    const addressRepository: AddressRepository = {
      search$: (): Observable<Address[]> => {
        return of([
          {
            context: '80, Somme, Hauts-de-France',
            label: '8 Boulevard du Port 80000 Amiens',
            localisation: Localisation({
              latitude: 4.8375548,
              longitude: 45.7665478
            })
          }
        ]);
      }
    };
    const addressPresenter: AddressPresenter = new AddressPresenter(addressRepository);
    const searchTerm: string = '33 Avenue des Lilas, 66210 Bolquère, France';

    const addressesFound: AddressFoundPresentation[] = await firstValueFrom(addressPresenter.search$(searchTerm));

    expect(addressesFound).toStrictEqual([
      {
        context: '80, Somme, Hauts-de-France',
        label: '8 Boulevard du Port 80000 Amiens',
        localisation: Localisation({
          latitude: 4.8375548,
          longitude: 45.7665478
        })
      }
    ]);
  });
});

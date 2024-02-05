import { AddressPresenter } from './address.presenter';
import { firstValueFrom, Observable, of } from 'rxjs';
import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { AddressRepository } from '../../repositories';
import { Address } from '../../models';
import { ResultFoundPresentation } from './result-found.presentation';

describe('address presenter', (): void => {
  it('should search an address', async (): Promise<void> => {
    const addressRepository: AddressRepository = {
      search$: (): Observable<Address[]> => {
        return of([
          {
            id: 'testId-01',
            context: '80, Somme, Hauts-de-France',
            label: '8 Boulevard du Port 80000 Amiens',
            localisation: Localisation({
              latitude: 4.8375548,
              longitude: 45.7665478
            }),
            type: 'housenumber'
          }
        ]);
      },
      reverse$: (): Observable<Address[]> => {
        return of([
          {
            id: 'testId-01',
            context: '80, Somme, Hauts-de-France',
            label: '8 Boulevard du Port 80000 Amiens',
            localisation: Localisation({
              latitude: 4.8375548,
              longitude: 45.7665478
            }),
            type: 'housenumber'
          }
        ]);
      }
    };
    const addressPresenter: AddressPresenter = new AddressPresenter(addressRepository);
    const searchTerm: string = '33 Avenue des Lilas, 66210 Bolquère, France';

    const addressesFound: ResultFoundPresentation[] = await firstValueFrom(addressPresenter.search$(searchTerm));
    const addressesFoundReverse: ResultFoundPresentation[] = await firstValueFrom(
      addressPresenter.reverse$(
        Localisation({
          latitude: 4.8375548,
          longitude: 45.7665478
        })
      )
    );

    expect(addressesFound).toStrictEqual([
      {
        id: 'testId-01',
        context: '80, Somme, Hauts-de-France',
        label: '8 Boulevard du Port 80000 Amiens',
        localisation: Localisation({
          latitude: 4.8375548,
          longitude: 45.7665478
        }),
        payload: { type: 'housenumber' }
      }
    ]);

    expect(addressesFoundReverse).toStrictEqual([
      {
        id: 'testId-01',
        context: '80, Somme, Hauts-de-France',
        label: '8 Boulevard du Port 80000 Amiens',
        localisation: Localisation({
          latitude: 4.8375548,
          longitude: 45.7665478
        }),
        payload: { type: 'housenumber' }
      }
    ]);
  });
});

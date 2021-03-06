import { AddressHttp } from './address.http';
import { Address } from '../../../../domain/models';
import { firstValueFrom, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AddressTransfer } from '../../transfers/address.transfer';
import { Localisation } from '../../../../../../models/localisation/localisation';

describe('address http', (): void => {
  it('should get addresses from addresses transfer', async (): Promise<void> => {
    const httpClient: HttpClient = {
      get: (): Observable<AddressTransfer> =>
        of({
          type: 'FeatureCollection',
          features: [
            {
              geometry: {
                type: 'Point',
                coordinates: [4.8375548, 45.7665478]
              },
              properties: {
                context: '80, Somme, Hauts-de-France',
                label: '8 Boulevard du Port 80000 Amiens'
              }
            }
          ]
        } as AddressTransfer)
    } as unknown as HttpClient;
    const addressHttp: AddressHttp = new AddressHttp(httpClient);

    const addresses: Address[] = await firstValueFrom(addressHttp.search$('8 Boulevard du Port 80000 Amiens'));

    expect(addresses).toStrictEqual([
      {
        context: '80, Somme, Hauts-de-France',
        label: '8 Boulevard du Port 80000 Amiens',
        localisation: Localisation({
          latitude: 45.7665478,
          longitude: 4.8375548
        })
      }
    ]);
  });
});

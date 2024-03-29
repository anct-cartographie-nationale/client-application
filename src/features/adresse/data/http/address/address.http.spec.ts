import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable, of } from 'rxjs';
import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { Address } from '../../../models';
import { AddressTransfer } from '../../transfers/address.transfer';
import { AddressHttp, formatAdresseQuery } from './address.http';

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
                id: 'addressTransferId',
                context: '80, Somme, Hauts-de-France',
                label: '8 Boulevard du Port 80000 Amiens',
                type: 'housenumber'
              }
            }
          ]
        } as AddressTransfer)
    } as unknown as HttpClient;
    const addressHttp: AddressHttp = new AddressHttp(httpClient);

    const addresses: Address[] = await firstValueFrom(addressHttp.search$('8 Boulevard du Port 80000 Amiens'));

    expect(addresses).toStrictEqual([
      {
        id: 'addressTransferId',
        context: '80, Somme, Hauts-de-France',
        label: '8 Boulevard du Port 80000 Amiens',
        localisation: Localisation({
          latitude: 45.7665478,
          longitude: 4.8375548
        }),
        type: 'housenumber'
      }
    ]);
  });

  it('should format adresse query with full address', function () {
    const adresseQuery: string = formatAdresseQuery('8 Boulevard du Port 80000 Amiens');

    expect(adresseQuery).toStrictEqual('autocomplete=0&q=8 Boulevard du Port 80000 Amiens');
  });

  it('should format adresse query with postcode', function () {
    const adresseQuery: string = formatAdresseQuery('80000');

    expect(adresseQuery).toStrictEqual('q=rue&postcode=80000');
  });
});

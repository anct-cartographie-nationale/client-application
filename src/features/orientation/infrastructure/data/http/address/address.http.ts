import { Address } from '../../../../domain/models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Feature, Point } from 'geojson';
import { AddressTransfer, AddressTransferProperties } from '../../transfers/address.transfer';
import { Localisation } from '../../../../../../models/localisation/localisation';
import { AddressRepository } from '../../../../../orientation/domain/repositories';

export class AddressHttp extends AddressRepository {
  public constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  public search$(searchTerm: string): Observable<Address[]> {
    return this._httpClient
      .get<AddressTransfer>(`https://api-adresse.data.gouv.fr/search/?autocomplete=0&q=${searchTerm}`)
      .pipe(
        map((addressTransfer: AddressTransfer): Address[] =>
          addressTransfer.features.map(
            (addressTransferFeature: Feature<Point, AddressTransferProperties>): Address => ({
              context: addressTransferFeature.properties.context,
              label: addressTransferFeature.properties.label,
              localisation: Localisation({
                latitude: addressTransferFeature.geometry.coordinates[1],
                longitude: addressTransferFeature.geometry.coordinates[0]
              })
            })
          )
        )
      );
  }

  public reverse$(localisation: Localisation): Observable<Address[]> {
    return this._httpClient
      .get<AddressTransfer>(
        `https://api-adresse.data.gouv.fr/reverse/?lon=${localisation.longitude}&lat=${localisation.latitude}`
      )
      .pipe(
        map((addressTransfer: AddressTransfer): Address[] =>
          addressTransfer.features.map(
            (addressTransferFeature: Feature<Point, AddressTransferProperties>): Address => ({
              context: addressTransferFeature.properties.context,
              label: addressTransferFeature.properties.label,
              localisation: Localisation({
                latitude: addressTransferFeature.geometry.coordinates[1],
                longitude: addressTransferFeature.geometry.coordinates[0]
              })
            })
          )
        )
      );
  }
}

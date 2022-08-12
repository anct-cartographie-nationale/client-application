import { firstValueFrom } from 'rxjs';
import { Localisation, NO_LOCALISATION } from '../../../core';
import { GeolocationPresenter } from './geolocation.presenter';

describe('geolocation presenter', (): void => {
  it('should get user coordinates', async (): Promise<void> => {
    const geolocationPresenter: GeolocationPresenter = new GeolocationPresenter();

    geolocationPresenter.setLocalisation(
      Localisation({
        latitude: 46.28146057911664,
        longitude: 4.468874066180609
      })
    );

    const location: Localisation = await firstValueFrom(geolocationPresenter.location$);

    expect(location).toStrictEqual({
      latitude: 46.28146057911664,
      longitude: 4.468874066180609
    });
  });

  it('should not get any coordinates when no location has been processed', async (): Promise<void> => {
    const geolocationPresenter = new GeolocationPresenter();

    const location: Localisation = await firstValueFrom(geolocationPresenter.location$);

    expect(location).toStrictEqual(NO_LOCALISATION);
  });
});

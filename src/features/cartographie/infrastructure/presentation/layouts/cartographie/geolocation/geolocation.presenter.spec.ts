import { GeolocationPresenter, GeolocationProvider } from './geolocation.presenter';
import { firstValueFrom } from 'rxjs';
import { Coordinates, NO_COORDINATES } from '../../../../../domain';

const geolocationSuccessProvider: GeolocationProvider = {
  getCurrentPosition: (successCallback: PositionCallback) =>
    successCallback({
      coords: {
        latitude: 46.28146057911664,
        longitude: 4.468874066180609
      }
    } as GeolocationPosition)
};

const geolocationErrorProvider: GeolocationProvider = {
  getCurrentPosition: (successCallback: PositionCallback, errorCallback?: PositionErrorCallback) =>
    errorCallback &&
    errorCallback({
      code: -1,
      message: 'geolocation error'
    } as GeolocationPositionError)
};

describe('geolocation presenter', (): void => {
  it('should get user coordinates', async (): Promise<void> => {
    const geolocationPresenter: GeolocationPresenter = new GeolocationPresenter();

    geolocationPresenter.locate(geolocationSuccessProvider);
    const location: Coordinates = await firstValueFrom(geolocationPresenter.location$);

    expect(location).toStrictEqual({
      latitude: 46.28146057911664,
      longitude: 4.468874066180609
    });
  });

  it('should not get any coordinates when no location has been processed', async (): Promise<void> => {
    const geolocationPresenter = new GeolocationPresenter();

    const location: Coordinates = await firstValueFrom(geolocationPresenter.location$);

    expect(location).toStrictEqual(NO_COORDINATES);
  });

  it('should get an error on geolocation failure', async (): Promise<void> => {
    const geolocationPresenter = new GeolocationPresenter();

    geolocationPresenter.locate(geolocationErrorProvider);
    await firstValueFrom(geolocationPresenter.location$).catch((error) => {
      expect(error).toStrictEqual({
        code: -1,
        message: 'geolocation error'
      });
    });
  });
});

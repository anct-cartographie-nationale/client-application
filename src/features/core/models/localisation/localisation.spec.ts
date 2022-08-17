import { LatitudeError, LongitudeError, Localisation } from './localisation';

describe('localisation model', (): void => {
  it('should create a valid localisation', (): void => {
    const localisationData = {
      latitude: 4.8375548,
      longitude: 45.7665478
    };

    const localisation = Localisation(localisationData);

    expect(localisation).toStrictEqual({ ...localisationData } as Localisation);
  });

  it('should throw LatitudeError when latitude is less than -90', (): void => {
    const localisationData = {
      latitude: -91,
      longitude: 45.7665478
    };

    expect(() => {
      Localisation(localisationData);
    }).toThrow(new LatitudeError(localisationData.latitude));
  });

  it('should throw LatitudeError when latitude is more than 90', (): void => {
    const localisationData = {
      latitude: 91,
      longitude: 45.7665478
    };

    expect(() => {
      Localisation(localisationData);
    }).toThrow(new LatitudeError(localisationData.latitude));
  });

  it('should throw longitudeError when longitude is less than -180', (): void => {
    const localisationData = {
      latitude: 4.8375548,
      longitude: -181
    };

    expect(() => {
      Localisation(localisationData);
    }).toThrow(new LongitudeError(localisationData.longitude));
  });

  it('should throw longitudeError when longitude is more than 180', (): void => {
    const localisationData = {
      latitude: 4.8375548,
      longitude: 181
    };

    expect(() => {
      Localisation(localisationData);
    }).toThrow(new LongitudeError(localisationData.longitude));
  });
});

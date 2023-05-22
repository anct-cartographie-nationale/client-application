import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { NO_LOCALISATION } from '../../../core/models';
import { localisationFromStrings } from './localisation.presenter';

describe('localisation presenter', (): void => {
  it('should parse latitude and longitude strings to location', (): void => {
    const latitude: string = '45.75916';
    const longitude: string = '4.790584';

    const localisation: Localisation = localisationFromStrings(latitude, longitude);

    expect(localisation).toStrictEqual<Localisation>(
      Localisation({
        latitude: 45.75916,
        longitude: 4.790584
      })
    );
  });

  it('should parse undefined latitude and longitude to empty localisation', (): void => {
    const latitude: undefined = undefined;
    const longitude: undefined = undefined;

    const localisation: Localisation = localisationFromStrings(latitude, longitude);

    expect(localisation).toStrictEqual<Localisation>(NO_LOCALISATION);
  });
});

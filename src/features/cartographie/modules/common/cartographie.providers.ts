import { INITIAL_POSITION_TOKEN, ZOOM_LEVEL_TOKEN } from '@gouvfr-anct/mediation-numerique';
import { POSITION_CONFIGURATION, ZOOM_LEVEL_CONFIGURATION } from '../../../../root';

export const cartographieProviders = [
  {
    provide: INITIAL_POSITION_TOKEN,
    useValue: POSITION_CONFIGURATION
  },
  {
    provide: ZOOM_LEVEL_TOKEN,
    useValue: ZOOM_LEVEL_CONFIGURATION
  }
];

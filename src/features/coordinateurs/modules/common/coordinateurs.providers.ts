import { INITIAL_POSITION_TOKEN, POSITION_CONFIGURATION, ZOOM_LEVEL_CONFIGURATION, ZOOM_LEVEL_TOKEN } from '../../../../root';

export const coordinateursProviders = [
  {
    provide: INITIAL_POSITION_TOKEN,
    useValue: POSITION_CONFIGURATION
  },
  {
    provide: ZOOM_LEVEL_TOKEN,
    useValue: ZOOM_LEVEL_CONFIGURATION
  }
];

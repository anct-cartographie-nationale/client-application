import { HttpClient } from '@angular/common/http';
import { INITIAL_POSITION_TOKEN, ZOOM_LEVEL_TOKEN } from '@gouvfr-anct/mediation-numerique';
import { LieuxMediationNumeriqueRepository } from '../../domain';
import { LieuxMediationNumeriqueHttp } from '../data/http';
import { DATA_CONFIGURATION, DATA_TOKEN, POSITION_CONFIGURATION, ZOOM_LEVEL_CONFIGURATION } from '../../../../root';

export const CartographieProviders = [
  {
    provide: DATA_TOKEN,
    useValue: DATA_CONFIGURATION
  },
  {
    provide: INITIAL_POSITION_TOKEN,
    useValue: POSITION_CONFIGURATION
  },
  {
    provide: ZOOM_LEVEL_TOKEN,
    useValue: ZOOM_LEVEL_CONFIGURATION
  },
  {
    deps: [DATA_TOKEN, HttpClient],
    provide: LieuxMediationNumeriqueRepository,
    useClass: LieuxMediationNumeriqueHttp
  }
];

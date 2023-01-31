import { HttpClient } from '@angular/common/http';
import { LieuxMediationNumeriqueRepository } from '../../../features/core';
import { LieuxMediationNumeriqueHttp } from '../../../features/core/data';
import {
  BRAND_CONFIGURATION,
  BRAND_TOKEN,
  DATA_CONFIGURATION,
  DATA_TOKEN,
  FEATURES_CONFIGURATION,
  FEATURES_TOKEN
} from '../../configuration';

export const mediationNumeriqueProviders = [
  {
    provide: BRAND_TOKEN,
    useValue: BRAND_CONFIGURATION
  },
  {
    provide: FEATURES_TOKEN,
    useValue: FEATURES_CONFIGURATION
  },
  {
    provide: DATA_TOKEN,
    useValue: DATA_CONFIGURATION
  },
  {
    deps: [DATA_TOKEN, HttpClient],
    provide: LieuxMediationNumeriqueRepository,
    useClass: LieuxMediationNumeriqueHttp
  }
];

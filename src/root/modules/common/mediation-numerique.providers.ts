import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { LieuxMediationNumeriqueRepository } from '../../../features/core/repositories';
import { LieuxMediationNumeriqueHttp } from '../../../features/core/data';
import {
  BRAND_CONFIGURATION,
  BRAND_TOKEN,
  DATA_CONFIGURATION,
  DATA_TOKEN,
  FEATURES_CONFIGURATION,
  FEATURES_TOKEN
} from '../../configuration';
import { CacheInterceptor } from '../../interceptors';
import { setTitleActionProvider } from '../../providers';
import { setTitleAction } from '../../actions';
import { Title } from '@angular/platform-browser';

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
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CacheInterceptor,
    multi: true
  },
  setTitleActionProvider(setTitleAction, [BRAND_TOKEN, Title])
];

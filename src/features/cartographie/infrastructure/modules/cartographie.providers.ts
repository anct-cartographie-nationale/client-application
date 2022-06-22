import { HttpClient } from '@angular/common/http';
import { SEARCH_TOKEN, STRUCTURE_TOKEN } from '@gouvfr-anct/mediation-numerique';
import { SearchService, StructureService } from '../services';
import { LieuxMediationNumeriqueRepository } from '../../domain';
import { LieuxMediationNumeriqueHttp } from '../data/http';
import { DATA_CONFIGURATION, DATA_TOKEN } from '../../../../root';

export const CartographieProviders = [
  {
    provide: DATA_TOKEN,
    useValue: DATA_CONFIGURATION
  },
  {
    provide: SEARCH_TOKEN,
    useClass: SearchService
  },
  {
    provide: STRUCTURE_TOKEN,
    useClass: StructureService
  },
  {
    deps: [DATA_TOKEN, HttpClient],
    provide: LieuxMediationNumeriqueRepository,
    useClass: LieuxMediationNumeriqueHttp
  }
];

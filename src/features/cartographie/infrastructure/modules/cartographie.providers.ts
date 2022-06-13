import { SEARCH_TOKEN, STRUCTURE_TOKEN } from '@gouvfr-anct/mediation-numerique';
import { SearchService, StructureService } from '../services';
import { LieuxMediationNumeriqueRepository } from '../../domain';
import { LieuxMediationNumeriqueHttp } from '../data/http';

export const CartographieProviders = [
  {
    provide: SEARCH_TOKEN,
    useClass: SearchService
  },
  {
    provide: STRUCTURE_TOKEN,
    useClass: StructureService
  },
  {
    provide: LieuxMediationNumeriqueRepository,
    useClass: LieuxMediationNumeriqueHttp
  }
];

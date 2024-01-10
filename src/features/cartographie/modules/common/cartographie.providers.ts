import { HttpClient } from '@angular/common/http';
import {
  CLUSTER_CONFIGURATION,
  CLUSTER_TOKEN,
  INITIAL_POSITION_TOKEN,
  POSITION_CONFIGURATION,
  ZOOM_LEVEL_CONFIGURATION,
  ZOOM_LEVEL_TOKEN
} from '../../../../root';
import { AddressHttp, AddressRepository } from '../../../adresse';

export const cartographieProviders = [
  {
    provide: INITIAL_POSITION_TOKEN,
    useValue: POSITION_CONFIGURATION
  },
  {
    provide: ZOOM_LEVEL_TOKEN,
    useValue: ZOOM_LEVEL_CONFIGURATION
  },
  {
    provide: CLUSTER_TOKEN,
    useValue: CLUSTER_CONFIGURATION
  },
  {
    deps: [HttpClient],
    provide: AddressRepository,
    useClass: AddressHttp
  }
];

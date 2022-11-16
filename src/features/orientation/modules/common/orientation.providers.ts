import { HttpClient } from '@angular/common/http';
import { BRAND_CONFIGURATION, BRAND_TOKEN } from '../../../../root';
import { AddressHttp, AddressRepository } from '../../../adresse';

export const orientationProviders = [
  {
    provide: BRAND_TOKEN,
    useValue: BRAND_CONFIGURATION
  },
  {
    deps: [HttpClient],
    provide: AddressRepository,
    useClass: AddressHttp
  }
];

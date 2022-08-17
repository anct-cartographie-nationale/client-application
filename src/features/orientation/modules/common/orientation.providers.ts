import { HttpClient } from '@angular/common/http';
import { BRAND_CONFIGURATION, BRAND_TOKEN } from '../../../../root';
import { AddressRepository } from '../../repositories';
import { AddressHttp } from '../../data/http';

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

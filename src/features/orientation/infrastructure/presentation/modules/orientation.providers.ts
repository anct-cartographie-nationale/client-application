import { HttpClient } from '@angular/common/http';
import { AddressRepository } from '../../../domain/repositories';
import { AddressHttp } from '../../data/http';

export const OrientationProviders = [
  {
    deps: [HttpClient],
    provide: AddressRepository,
    useClass: AddressHttp
  }
];

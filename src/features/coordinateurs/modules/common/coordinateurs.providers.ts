import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  ASSETS_CONFIGURATION,
  ASSETS_TOKEN,
  INITIAL_POSITION_TOKEN,
  POSITION_CONFIGURATION,
  ZOOM_LEVEL_CONFIGURATION,
  ZOOM_LEVEL_TOKEN
} from '../../../../root';
import { CacheInterceptor } from '../../../../root/interceptors';
import { AddressHttp, AddressPresenter, AddressRepository, SEARCHABLE_TOKEN } from '../../../adresse';
import { MarkersPresenter } from '../../../core/presenters';
import { ConseillersHttp, CoordinateursHttp } from '../../data';
import { ConseillersRepository, CoordinateursRepository } from '../../reporitories';

export const coordinateursProviders = [
  {
    provide: ASSETS_TOKEN,
    useValue: ASSETS_CONFIGURATION
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
    deps: [ZOOM_LEVEL_TOKEN, INITIAL_POSITION_TOKEN],
    provide: MarkersPresenter,
    useClass: MarkersPresenter
  },
  {
    deps: [HttpClient],
    provide: CoordinateursRepository,
    useClass: CoordinateursHttp
  },
  {
    deps: [HttpClient],
    provide: ConseillersRepository,
    useClass: ConseillersHttp
  },
  {
    deps: [HttpClient],
    provide: AddressRepository,
    useClass: AddressHttp
  },
  {
    deps: [AddressRepository],
    provide: SEARCHABLE_TOKEN,
    useClass: AddressPresenter,
    multi: true
  },
  {
    deps: [HttpClient],
    provide: SEARCHABLE_TOKEN,
    useClass: ConseillersHttp,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CacheInterceptor,
    multi: true
  }
];

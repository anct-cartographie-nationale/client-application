import { HttpClient } from '@angular/common/http';
import { INITIAL_POSITION_TOKEN, ZOOM_LEVEL_TOKEN } from '../../../../root';
import { AddressPresenter, AddressRepository } from '../../../adresse';
import { MarkersPresenter } from '../../../core';
import { ConseillersHttp, CoordinateursHttp } from '../../data';
import { ConseillersRepository, CoordinateursRepository } from '../../reporitories';
import { CoordinateursOnMapPresenter } from './coordinateurs-on-map';
import { ConseillersOnMapPresenter } from './conseillers-on-map';

export const coordinateursLayoutProviders = [
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
    deps: [CoordinateursRepository],
    provide: CoordinateursOnMapPresenter,
    useClass: CoordinateursOnMapPresenter
  },
  {
    deps: [ConseillersRepository],
    provide: ConseillersOnMapPresenter,
    useClass: ConseillersOnMapPresenter
  },
  {
    deps: [AddressRepository],
    provide: AddressPresenter,
    useClass: AddressPresenter
  },
  {
    deps: [ZOOM_LEVEL_TOKEN, INITIAL_POSITION_TOKEN],
    provide: MarkersPresenter,
    useClass: MarkersPresenter
  }
];

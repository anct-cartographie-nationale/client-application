import { HttpClient } from '@angular/common/http';
import {
  ASSETS_CONFIGURATION,
  ASSETS_TOKEN,
  INITIAL_POSITION_TOKEN,
  POSITION_CONFIGURATION,
  ZOOM_LEVEL_CONFIGURATION,
  ZOOM_LEVEL_TOKEN
} from '../../../../root';
import { AddressPresenter, AddressRepository } from '../../../adresse';
import { MarkersPresenter } from '../../../core';
import { ConseillersHttp, CoordinateursHttp } from '../../data';
import { ConseillersRepository, CoordinateursRepository } from '../../reporitories';
import { CoordinateursOnMapPresenter } from '../../layouts/coordinateurs/coordinateurs-on-map';
import { ConseillersOnMapPresenter } from '../../layouts/coordinateurs/conseillers-on-map';

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
  }
];

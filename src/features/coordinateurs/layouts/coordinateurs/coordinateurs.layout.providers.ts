import { INITIAL_POSITION_TOKEN, ZOOM_LEVEL_TOKEN } from '../../../../root';
import { MarkersPresenter } from '../../../core';
import { AddressPresenter, AddressRepository } from '../../../adresse';
import { CoordinateursOnMapPresenter } from './coordinateurs-on-map';
import { ConseillersOnMapPresenter } from './conseillers-on-map';

export const coordinateursLayoutProviders = [
  {
    provide: CoordinateursOnMapPresenter,
    useClass: CoordinateursOnMapPresenter
  },
  {
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

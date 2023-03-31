import { INITIAL_POSITION_TOKEN, ZOOM_LEVEL_TOKEN } from '../../../../root';
import { MarkersPresenter } from '../../../core';
import { AddressPresenter, AddressRepository } from '../../../adresse';
import { CoordinateursOnMapPresenter } from './coordinateurs-on-map.presenter';

export const coordinateursLayoutProviders = [
  {
    provide: CoordinateursOnMapPresenter,
    useClass: CoordinateursOnMapPresenter
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

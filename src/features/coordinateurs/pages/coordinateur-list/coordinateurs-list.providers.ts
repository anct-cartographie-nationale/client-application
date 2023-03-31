import { CoordinateursListPresenter } from './coordinateurs-list.presenter';

export const coordinateursListProviders = [
  {
    provide: CoordinateursListPresenter,
    useClass: CoordinateursListPresenter
  }
];

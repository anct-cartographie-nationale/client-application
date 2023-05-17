import { CoordinateursRepository } from '../../reporitories';
import { CoordinateursListPresenter } from './coordinateurs-list.presenter';

export const coordinateursListProviders = [
  {
    deps: [CoordinateursRepository],
    provide: CoordinateursListPresenter,
    useClass: CoordinateursListPresenter
  }
];

import { INITIAL_POSITION_TOKEN, ZOOM_LEVEL_TOKEN } from '../../../../root';
import { MarkersPresenter } from '../../../cartographie/presenters';
import { CoordinateursListPresenter } from './coordinateurs-list.presenter';

export const coordinateursListProviders = [
  {
    provide: CoordinateursListPresenter,
    useClass: CoordinateursListPresenter
  },
  {
    deps: [ZOOM_LEVEL_TOKEN, INITIAL_POSITION_TOKEN],
    provide: MarkersPresenter,
    useClass: MarkersPresenter
  }
];

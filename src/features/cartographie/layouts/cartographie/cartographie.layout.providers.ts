import { LieuxMediationNumeriquePresenter, MarkersPresenter } from '../../../core/presenters';
import { LieuxMediationNumeriqueRepository } from '../../../core/repositories';
import { AddressPresenter, AddressRepository } from '../../../adresse';
import { LieuxMediationNumeriqueDetailsPresenter } from '../../presenters';
import { INITIAL_POSITION_TOKEN, ZOOM_LEVEL_TOKEN } from '../../../../root';

export const cartographieLayoutProviders = [
  {
    deps: [LieuxMediationNumeriqueRepository],
    provide: LieuxMediationNumeriquePresenter,
    useClass: LieuxMediationNumeriquePresenter
  },
  {
    deps: [LieuxMediationNumeriqueRepository],
    provide: LieuxMediationNumeriqueDetailsPresenter,
    useClass: LieuxMediationNumeriqueDetailsPresenter
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

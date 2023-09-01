import { LieuxMediationNumeriquePresenter, MarkersPresenter } from '../../../core/presenters';
import { LieuxMediationNumeriqueRepository } from '../../../core/repositories';
import { AddressPresenter, AddressRepository, SEARCHABLE_TOKEN } from '../../../adresse';
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
    deps: [LieuxMediationNumeriqueRepository],
    provide: SEARCHABLE_TOKEN,
    useClass: LieuxMediationNumeriquePresenter,
    multi: true
  },
  {
    deps: [AddressRepository],
    provide: SEARCHABLE_TOKEN,
    useClass: AddressPresenter,
    multi: true
  },
  {
    deps: [ZOOM_LEVEL_TOKEN, INITIAL_POSITION_TOKEN],
    provide: MarkersPresenter,
    useClass: MarkersPresenter
  }
];

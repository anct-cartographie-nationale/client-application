import { LieuxMediationNumeriquePresenter, MarkersPresenter } from '../../../core/presenters';
import { LieuxMediationNumeriqueRepository } from '../../../core/repositories';
import { AddressPresenter, AddressRepository } from '../../../adresse';
import { LieuxMediationNumeriqueDetailsPresenter } from '../../presenters';
import { INITIAL_POSITION_TOKEN, ZOOM_LEVEL_TOKEN } from '../../../../root';
import { HttpClient } from '@angular/common/http';

export const cartographieLayoutProviders = [
  {
    deps: [LieuxMediationNumeriqueRepository],
    provide: LieuxMediationNumeriquePresenter,
    useClass: LieuxMediationNumeriquePresenter
  },
  {
    deps: [LieuxMediationNumeriqueRepository, HttpClient],
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

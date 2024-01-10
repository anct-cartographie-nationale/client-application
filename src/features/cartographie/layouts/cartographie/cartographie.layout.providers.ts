import { CLUSTER_TOKEN, INITIAL_POSITION_TOKEN, ZOOM_LEVEL_TOKEN } from '../../../../root';
import { AddressPresenter, AddressRepository, SEARCHABLE_TOKEN } from '../../../adresse';
import { LieuxMediationNumeriquePresenter, MarkersPresenter } from '../../../core/presenters';
import { ClustersPresenter } from '../../../core/presenters/clusters';
import { LieuxMediationNumeriqueRepository } from '../../../core/repositories';
import { LieuxMediationNumeriqueDetailsPresenter } from '../../presenters';

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
  },
  {
    deps: [MarkersPresenter, CLUSTER_TOKEN],
    provide: ClustersPresenter,
    useClass: ClustersPresenter
  }
];

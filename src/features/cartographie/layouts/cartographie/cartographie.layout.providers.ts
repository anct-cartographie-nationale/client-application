import { INITIAL_POSITION_TOKEN, ZOOM_LEVEL_TOKEN } from '@gouvfr-anct/mediation-numerique';
import { LieuxMediationNumeriquePresenter, LieuxMediationNumeriqueRepository } from '../../../core';
import { AddressPresenter, AddressRepository } from '../../../adresse';
import { LieuxMediationNumeriqueDetailsPresenter, MarkersPresenter } from '../../presenters';
import { MARKERS, MARKERS_TOKEN } from '../../configuration';

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
    provide: MARKERS_TOKEN,
    useValue: MARKERS
  },
  {
    deps: [ZOOM_LEVEL_TOKEN, INITIAL_POSITION_TOKEN],
    provide: MarkersPresenter,
    useClass: MarkersPresenter
  }
];

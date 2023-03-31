import { CoordinateurDetailsPresenter } from './coordinateur-details.presenter';

export const coordinateurDetailsProviders = [
  {
    provide: CoordinateurDetailsPresenter,
    useClass: CoordinateurDetailsPresenter
  }
];

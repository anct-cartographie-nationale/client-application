import { CoordinateurDetailsPresenter } from './coordinateur-details.presenter';
import { HttpClient } from '@angular/common/http';
import { ConseillersRepository, CoordinateursRepository } from '../../reporitories';
import { ConseillersHttp, CoordinateursHttp } from '../../data';

export const coordinateurDetailsProviders = [
  {
    deps: [HttpClient],
    provide: CoordinateursRepository,
    useClass: CoordinateursHttp
  },
  {
    deps: [HttpClient],
    provide: ConseillersRepository,
    useClass: ConseillersHttp
  },
  {
    deps: [ConseillersRepository, CoordinateursRepository],
    provide: CoordinateurDetailsPresenter,
    useClass: CoordinateurDetailsPresenter
  }
];

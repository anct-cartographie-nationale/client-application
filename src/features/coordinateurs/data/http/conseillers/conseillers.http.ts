import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conseiller } from '../../../models';
import { ConseillersRepository } from '../../../reporitories';
import { DATA_COORDINATEURS_CONFIGURATION } from '../../configuration';

export class ConseillersHttp extends ConseillersRepository {
  public constructor(private readonly httpClient: HttpClient) {
    super();
  }

  public getAll$ = (): Observable<Conseiller[]> =>
    this.httpClient.get<Conseiller[]>(DATA_COORDINATEURS_CONFIGURATION.conseillers);
}

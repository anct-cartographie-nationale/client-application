import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conseiller } from '../../../models';
import { ConseillersRepository } from '../../../reporitories';

export class ConseillersHttp extends ConseillersRepository {
  public constructor(private readonly httpClient: HttpClient) {
    super();
  }

  public getAll$ = (): Observable<Conseiller[]> =>
    this.httpClient.get<Conseiller[]>(
      'https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.10.1/assets/data/conseillers.json'
    );
}

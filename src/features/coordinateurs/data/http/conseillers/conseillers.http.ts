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
      'http://anct-carto-client-feature-les-assembleurs.s3.eu-west-3.amazonaws.com/conseillers.json'
    );
}

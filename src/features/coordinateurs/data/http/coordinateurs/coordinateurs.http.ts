import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coordinateur } from '../../../models';
import { CoordinateursRepository } from '../../../reporitories';

export class CoordinateursHttp extends CoordinateursRepository {
  public constructor(private readonly httpClient: HttpClient) {
    super();
  }

  public getAll$ = (): Observable<Coordinateur[]> =>
    this.httpClient.get<Coordinateur[]>(
      'http://anct-carto-client-feature-les-assembleurs.s3.eu-west-3.amazonaws.com/coordinateurs.json'
    );
}

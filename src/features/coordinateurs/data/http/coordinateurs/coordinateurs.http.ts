import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coordinateur } from '../../../models';
import { CoordinateursRepository } from '../../../reporitories';
import { DATA_COORDINATEURS_CONFIGURATION } from '../../../../..//root';

export class CoordinateursHttp extends CoordinateursRepository {
  public constructor(private readonly httpClient: HttpClient) {
    super();
  }

  public getAll$ = (): Observable<Coordinateur[]> =>
    this.httpClient.get<Coordinateur[]>(DATA_COORDINATEURS_CONFIGURATION.coordinateurs);
}

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
      'https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.10.0/assets/data/coordinateurs.json'
    );
}

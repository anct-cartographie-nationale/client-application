import { HttpClient } from '@angular/common/http';
import { Structure } from '@gouvfr-anct/mediation-numerique';
import { Observable } from 'rxjs';
import { LieuxMediationNumeriqueRepository } from '../../../../domain';
import { DataConfiguration } from '../../../../../../root';
import { LieuxMediationNumeriqueTransfer, toResinStructures } from '../../transfers';
import { map } from 'rxjs/operators';

export class LieuxMediationNumeriqueHttp extends LieuxMediationNumeriqueRepository {
  public constructor(private readonly dataConfiguration: DataConfiguration, private readonly httpClient: HttpClient) {
    super();
  }

  public getAll$(): Observable<Structure[]> {
    return this.httpClient
      .get<LieuxMediationNumeriqueTransfer[]>(this.dataConfiguration.lieuxDeMediationNumerique)
      .pipe(map(toResinStructures));
  }
}

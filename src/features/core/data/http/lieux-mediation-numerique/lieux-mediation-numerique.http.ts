import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataConfiguration } from '../../../../../root';
import { LieuMediationNumerique, LieuxMediationNumeriqueRepository } from '../../../../core';
import { LieuMediationNumeriqueTransfer, toLieuxMediationNumerique } from '../../transfers/lieu-mediation-numerique.transfer';

export class LieuxMediationNumeriqueHttp extends LieuxMediationNumeriqueRepository {
  public constructor(private readonly dataConfiguration: DataConfiguration, private readonly httpClient: HttpClient) {
    super();
  }

  public getAll$(): Observable<LieuMediationNumerique[]> {
    return this.httpClient
      .get<LieuMediationNumeriqueTransfer[]>(this.dataConfiguration.lieuxDeMediationNumerique)
      .pipe(map(toLieuxMediationNumerique), shareReplay());
  }
}

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { fromSchemaLieuDeMediationNumerique } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { DataConfiguration } from '../../../../../root';
import { LieuxMediationNumeriqueRepository } from '../../../repositories';
import { Aidants, LieuMediationNumeriqueWithAidants } from '../../../models';
import { AidantTransfer, LieuMediationNumeriqueWithAidantsTransfer } from '../../../transfer';

const aidantsIfAny = (aidants?: AidantTransfer[]): { aidants?: Aidants } =>
  aidants == null ? {} : { aidants: Aidants(aidants) };

const toLieuMediationNumeriqueWithAidants = (
  lieuMediationNumeriqueWithAidantsTransfer: LieuMediationNumeriqueWithAidantsTransfer
): LieuMediationNumeriqueWithAidants => ({
  ...fromSchemaLieuDeMediationNumerique(lieuMediationNumeriqueWithAidantsTransfer),
  ...aidantsIfAny(lieuMediationNumeriqueWithAidantsTransfer.aidants)
});

const onlyInAntilles = (lieuxMediationNumeriqueWithAidantsTransfer: LieuMediationNumeriqueWithAidantsTransfer): boolean =>
  lieuxMediationNumeriqueWithAidantsTransfer.code_postal.startsWith('971') ||
  lieuxMediationNumeriqueWithAidantsTransfer.code_postal.startsWith('972');

const toLieuxMediationNumeriqueWithAidantsInAntilles = (
  lieuxMediationNumeriqueWithAidantsTransfer: LieuMediationNumeriqueWithAidantsTransfer[]
): LieuMediationNumeriqueWithAidants[] =>
  lieuxMediationNumeriqueWithAidantsTransfer.filter(onlyInAntilles).map(toLieuMediationNumeriqueWithAidants);

export class LieuxMediationNumeriqueHttp extends LieuxMediationNumeriqueRepository {
  public constructor(private readonly dataConfiguration: DataConfiguration, private readonly httpClient: HttpClient) {
    super();
  }

  public getAll$(): Observable<LieuMediationNumeriqueWithAidants[]> {
    return this.httpClient
      .get<LieuMediationNumeriqueWithAidantsTransfer[]>(this.dataConfiguration.lieuxDeMediationNumerique)
      .pipe(map(toLieuxMediationNumeriqueWithAidantsInAntilles));
  }
}

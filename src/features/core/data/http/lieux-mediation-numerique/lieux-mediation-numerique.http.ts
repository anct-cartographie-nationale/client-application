import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { fromSchemaLieuDeMediationNumerique } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { DataBlacklistConfiguration, DataConfiguration } from '../../../../../root';
import { LieuxMediationNumeriqueRepository } from '../../../repositories';
import { Aidants, LieuMediationNumeriqueWithAidants } from '../../../models';
import { AidantTransfer, LieuMediationNumeriqueWithAidantsTransfer } from '../../../transfer';

export type LieuxMediationNumeriqueBlacklisted = {
  id: string;
  source: string;
};

const aidantsIfAny = (aidants?: AidantTransfer[]): { aidants?: Aidants } =>
  aidants == null ? {} : { aidants: Aidants(aidants) };

const toLieuMediationNumeriqueWithAidants = (
  lieuMediationNumeriqueWithAidantsTransfer: LieuMediationNumeriqueWithAidantsTransfer
): LieuMediationNumeriqueWithAidants => ({
  ...fromSchemaLieuDeMediationNumerique(lieuMediationNumeriqueWithAidantsTransfer),
  ...aidantsIfAny(lieuMediationNumeriqueWithAidantsTransfer.aidants)
});

const toLieuxMediationNumeriqueWithAidants = (
  lieuxMediationNumeriqueWithAidantsTransfer: LieuMediationNumeriqueWithAidantsTransfer[]
): LieuMediationNumeriqueWithAidants[] => lieuxMediationNumeriqueWithAidantsTransfer.map(toLieuMediationNumeriqueWithAidants);

export class LieuxMediationNumeriqueHttp extends LieuxMediationNumeriqueRepository {
  public constructor(
    private readonly dataConfiguration: DataConfiguration,
    private readonly dataBlacklistConfiguration: DataBlacklistConfiguration,
    private readonly httpClient: HttpClient
  ) {
    super();
  }

  private getlieuxDeMediationNumeriqueBlacklistIds$(): Observable<string[]> {
    return this.httpClient
      .get<LieuxMediationNumeriqueBlacklisted[]>(this.dataBlacklistConfiguration.lieuxDeMediationNumeriqueBlacklist)
      .pipe(
        map((lieuxBlacklistedIds: LieuxMediationNumeriqueBlacklisted[]) =>
          lieuxBlacklistedIds.map((lieuxBlacklistedId: LieuxMediationNumeriqueBlacklisted) => lieuxBlacklistedId.id)
        )
      );
  }

  public getAll$(): Observable<LieuMediationNumeriqueWithAidants[]> {
    return this.getlieuxDeMediationNumeriqueBlacklistIds$().pipe(
      switchMap((lieuxDeMediationNumeriqueBlacklistIds) =>
        this.httpClient.get<LieuMediationNumeriqueWithAidantsTransfer[]>(this.dataConfiguration.lieuxDeMediationNumerique).pipe(
          map(toLieuxMediationNumeriqueWithAidants),
          map((lieuxDeMediationNumerique) =>
            lieuxDeMediationNumerique.filter(
              (lieuDeMediationNumerique: LieuMediationNumeriqueWithAidants) =>
                !lieuxDeMediationNumeriqueBlacklistIds.includes(lieuDeMediationNumerique.id)
            )
          )
        )
      )
    );
  }
}

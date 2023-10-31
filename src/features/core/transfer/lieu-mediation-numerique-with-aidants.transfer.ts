import { SchemaLieuMediationNumerique } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LieuMediationNumeriqueWithNoPublicTransfer } from './lieu-mediation-numerique-with-no-public-transfer';

export type AidantTransfer = {
  nom: string;
  telephone: string;
  courriel: string;
};

export type LieuMediationNumeriqueWithAidantsTransfer = LieuMediationNumeriqueWithNoPublicTransfer &
  SchemaLieuMediationNumerique & {
    aidants?: AidantTransfer[];
  };

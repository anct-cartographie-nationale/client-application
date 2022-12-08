import { SchemaLieuMediationNumerique } from '@gouvfr-anct/lieux-de-mediation-numerique';

export type AidantTransfer = {
  nom: string;
  telephone: string;
  courriel: string;
};

export type LieuMediationNumeriqueWithAidantsTransfer = SchemaLieuMediationNumerique & {
  aidants?: AidantTransfer[];
};

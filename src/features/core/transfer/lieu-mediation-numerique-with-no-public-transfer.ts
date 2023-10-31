import { SchemaLieuMediationNumerique } from '@gouvfr-anct/lieux-de-mediation-numerique';

export type LieuMediationNumeriqueWithNoPublicTransfer = SchemaLieuMediationNumerique & {
  prive?: boolean;
};

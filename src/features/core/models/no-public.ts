import { LieuMediationNumerique } from '@gouvfr-anct/lieux-de-mediation-numerique';

export type LieuMediationNumeriqueWithNoPublic = LieuMediationNumerique & {
  prive?: boolean;
};

import { LieuMediationNumerique } from '../../../../../models';

export type LieuMediationNumeriqueListItemPresentation = LieuMediationNumerique & {
  distance?: number;
  status?: string;
};

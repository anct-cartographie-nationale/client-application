import { LieuMediationNumerique } from '../../models';
import { OpeningStatus } from '../horaires';

export type LieuMediationNumeriquePresentation = LieuMediationNumerique & {
  distance?: number;
  status?: OpeningStatus;
};

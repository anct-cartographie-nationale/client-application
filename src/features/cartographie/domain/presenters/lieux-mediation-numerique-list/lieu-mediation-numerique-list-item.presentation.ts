import { LieuMediationNumerique } from '../../../../../models';
import { OpeningStatus } from '../horaires/horaires.presenter';

export type LieuMediationNumeriqueListItemPresentation = LieuMediationNumerique & {
  distance?: number;
  status?: OpeningStatus;
};

import { LieuMediationNumerique, Localisation, NO_LOCALISATION } from '../../models';
import { openingStatus, OpeningStatus } from '../horaires';
import { ifAny } from '../../utilities';
import { geographicDistance } from '../distance';

export type LieuMediationNumeriquePresentation = LieuMediationNumerique & {
  distance?: number;
  status?: OpeningStatus;
};

const getDistance = (lieuMediationNumerique: LieuMediationNumerique, localisation: Localisation): number | undefined =>
  localisation === NO_LOCALISATION ? undefined : geographicDistance(lieuMediationNumerique.localisation, localisation);

export const toLieuxMediationNumeriquePresentation = (
  lieuMediationNumerique: LieuMediationNumerique,
  localisation: Localisation,
  date: Date
): LieuMediationNumeriquePresentation => ({
  ...lieuMediationNumerique,
  ...ifAny('distance', getDistance(lieuMediationNumerique, localisation)),
  ...ifAny('status', openingStatus(date)(lieuMediationNumerique.horaires))
});

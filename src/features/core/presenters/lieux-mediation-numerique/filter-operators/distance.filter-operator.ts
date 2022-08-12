import { FilterPresentation } from '../../filter';
import { LieuMediationNumeriquePresentation } from '../lieu-mediation-numerique.presentation';
import { FilterOperator } from '../lieux-mediation-numerique.presenter';

export const distanceFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation,
  filter: FilterPresentation
): boolean => (lieuMediationNumerique.distance && filter.distance ? lieuMediationNumerique.distance <= filter.distance : true);

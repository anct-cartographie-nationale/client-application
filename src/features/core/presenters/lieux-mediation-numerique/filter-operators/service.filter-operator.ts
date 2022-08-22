import { FilterOperator, FilterPresentation } from '../../filter';
import { LieuMediationNumeriquePresentation } from '../lieu-mediation-numerique.presentation';

export const serviceFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation,
  filter: FilterPresentation
): boolean =>
  lieuMediationNumerique.services && filter.services ? lieuMediationNumerique.services.includes(filter.services) : true;

import { FilterOperator, FilterPresentation } from '../../filter';
import { LieuMediationNumeriquePresentation } from '../lieu-mediation-numerique.presentation';

export const accessibiliteFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation,
  filter: FilterPresentation
): boolean => (filter.accessibilite ? lieuMediationNumerique.accessibilite != null : true);

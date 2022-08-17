import { FilterPresentation } from '../../filter';
import { LieuMediationNumeriquePresentation } from '../lieu-mediation-numerique.presentation';
import { FilterOperator } from '../lieux-mediation-numerique.presenter';

export const accessibiliteFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation,
  filter: FilterPresentation
): boolean => (filter.accessibilite ? lieuMediationNumerique.accessibilite != null : true);

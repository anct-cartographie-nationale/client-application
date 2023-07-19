import { FilterOperator, FilterPresentation } from '../../filter';
import { LieuMediationNumeriquePresentation } from '../lieu-mediation-numerique.presentation';

export const priseRdvFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation,
  filter: FilterPresentation
): boolean => (filter.prise_rdv ? lieuMediationNumerique.prise_rdv != null : true);

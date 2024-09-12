import { Frais } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { FilterOperator, FilterPresentation } from '../../filter';
import { LieuMediationNumeriquePresentation } from '../lieu-mediation-numerique.presentation';

const shouldApply = (fraisACharge?: Frais[]): fraisACharge is Frais[] => fraisACharge != null && fraisACharge.length > 0;

const hasAtLeastOneOfTheFilterProperties =
  (fraisACharge: Frais[]) => (hasOneOfTheFilteredFraisACharge: boolean, frais: Frais) =>
    hasOneOfTheFilteredFraisACharge || fraisACharge.includes(frais);

export const fraisAChargeFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation,
  filter: FilterPresentation
): boolean =>
  shouldApply(filter.frais_a_charge)
    ? lieuMediationNumerique.frais_a_charge?.reduce(hasAtLeastOneOfTheFilterProperties(filter.frais_a_charge), false) ?? false
    : true;

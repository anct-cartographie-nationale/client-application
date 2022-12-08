import { ConditionAcces } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { FilterOperator, FilterPresentation } from '../../filter';
import { LieuMediationNumeriquePresentation } from '../lieu-mediation-numerique.presentation';

const shouldApply = (conditionsAcces?: ConditionAcces[]): conditionsAcces is ConditionAcces[] =>
  conditionsAcces != null && conditionsAcces.length > 0;

const hasAtLeastOneOfTheFilterProperties =
  (conditionsAcces: ConditionAcces[]) => (hasOneOfTheFilteredConditionAccess: boolean, conditionAcces: ConditionAcces) =>
    hasOneOfTheFilteredConditionAccess || conditionsAcces.includes(conditionAcces);

export const conditionsAccesFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation,
  filter: FilterPresentation
): boolean =>
  shouldApply(filter.conditions_acces)
    ? lieuMediationNumerique.conditions_acces?.reduce(hasAtLeastOneOfTheFilterProperties(filter.conditions_acces), false) ??
      false
    : true;

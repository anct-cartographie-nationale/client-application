import { ConditionAccess } from '../../../models';
import { FilterOperator, FilterPresentation } from '../../filter';
import { LieuMediationNumeriquePresentation } from '../lieu-mediation-numerique.presentation';

const shouldFilter = (filter: FilterPresentation) => filter.conditions_access != null && filter.conditions_access.length > 0;

const hasAtLeastOneOfTheFilterProperties =
  (filter: FilterPresentation) => (hasOneOfTheFilteredConditionAccess: boolean, conditionAccess: ConditionAccess) =>
    hasOneOfTheFilteredConditionAccess || (filter.conditions_access ?? []).includes(conditionAccess);

export const conditionsAccessFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation,
  filter: FilterPresentation
): boolean =>
  shouldFilter(filter)
    ? lieuMediationNumerique.conditions_access?.reduce(hasAtLeastOneOfTheFilterProperties(filter), false) ?? false
    : true;
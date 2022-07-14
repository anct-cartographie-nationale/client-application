import { FilterPresentation } from '../../../../../orientation/domain/presenters/filter/filter.presenter';
import { ConditionAccess } from '../../../../../../models';
import { LieuMediationNumeriqueListItemPresentation } from '../lieu-mediation-numerique-list-item.presentation';
import { FilterOperator } from '../lieux-mediation-numerique-list.presenter';

const shouldFilter = (filter: FilterPresentation) => filter.conditions_access != null && filter.conditions_access.length > 0;

const hasAtLeastOneOfTheFilterProperties =
  (filter: FilterPresentation) => (hasOneOfTheFilteredModaliteAccess: boolean, modaliteAccess: ConditionAccess) =>
    hasOneOfTheFilteredModaliteAccess || (filter.conditions_access ?? []).includes(modaliteAccess);

export const conditionsAccessFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriqueListItemPresentation,
  filter: FilterPresentation
): boolean =>
  shouldFilter(filter)
    ? lieuMediationNumerique.conditions_access?.reduce(hasAtLeastOneOfTheFilterProperties(filter), false) ?? false
    : true;

import { FilterPresentation } from '../../../../../orientation/domain/presenters/filter/filter.presenter';
import { TypeAccompagnement } from '../../../../../../models/type-accompagnement';
import { LieuMediationNumeriqueListItemPresentation } from '../lieu-mediation-numerique-list-item.presentation';
import { FilterOperator } from '../lieux-mediation-numerique-list.presenter';

const shouldFilter = (filter: FilterPresentation) =>
  filter.types_accompagnement != null && filter.types_accompagnement.length > 0;

const hasAtLeastOneOfTheFilterProperties =
  (filter: FilterPresentation) => (hasOneOfTheFilteredTypesAccompagnement: boolean, typeAccompagnement: TypeAccompagnement) =>
    hasOneOfTheFilteredTypesAccompagnement || (filter.types_accompagnement ?? []).includes(typeAccompagnement);

export const typesAccompagnementFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriqueListItemPresentation,
  filter: FilterPresentation
): boolean =>
  shouldFilter(filter)
    ? lieuMediationNumerique.types_accompagnement?.reduce(hasAtLeastOneOfTheFilterProperties(filter), false) ?? false
    : true;

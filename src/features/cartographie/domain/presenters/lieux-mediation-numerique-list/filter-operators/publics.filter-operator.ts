import { LieuMediationNumeriqueListItemPresentation } from '../lieu-mediation-numerique-list-item.presentation';
import { FilterPresentation } from '../../../../../orientation/domain/presenters/filter/filter.presenter';
import { ModalitesAccess } from '../../../../../../models/modalites-access';
import { FilterOperator } from '../lieux-mediation-numerique-list.presenter';
import { Public } from '../../../../../../models/public';

const shouldFilter = (filter: FilterPresentation) => filter.publics != null && filter.publics.length > 0;

const hasAtLeastOneOfTheFilterProperties =
  (filter: FilterPresentation) => (hasOneOfTheFilteredPublic: boolean, publicToFilter: Public) =>
    hasOneOfTheFilteredPublic || (filter.publics ?? []).includes(publicToFilter);

export const publicsFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriqueListItemPresentation,
  filter: FilterPresentation
): boolean =>
  shouldFilter(filter)
    ? lieuMediationNumerique.publics?.reduce(hasAtLeastOneOfTheFilterProperties(filter), false) ?? false
    : true;

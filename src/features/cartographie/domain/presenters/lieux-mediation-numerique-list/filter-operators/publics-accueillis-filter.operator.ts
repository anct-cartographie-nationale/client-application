import { LieuMediationNumeriqueListItemPresentation } from '../lieu-mediation-numerique-list-item.presentation';
import { FilterPresentation } from '../../../../../orientation/domain/presenters/filter/filter.presenter';
import { FilterOperator } from '../lieux-mediation-numerique-list.presenter';
import { PublicAccueilli } from '../../../../../../models';

const shouldFilter = (filter: FilterPresentation) => filter.publics_accueillis != null && filter.publics_accueillis.length > 0;

const hasAtLeastOneOfTheFilterProperties =
  (filter: FilterPresentation) => (hasOneOfTheFilteredPublicAccueilli: boolean, publicAccueilliToFilter: PublicAccueilli) =>
    hasOneOfTheFilteredPublicAccueilli || (filter.publics_accueillis ?? []).includes(publicAccueilliToFilter);

export const publicsAccueillisFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriqueListItemPresentation,
  filter: FilterPresentation
): boolean =>
  shouldFilter(filter)
    ? lieuMediationNumerique.publics_accueillis?.reduce(hasAtLeastOneOfTheFilterProperties(filter), false) ?? false
    : true;

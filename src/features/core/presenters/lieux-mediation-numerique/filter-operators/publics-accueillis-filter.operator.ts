import { PublicAccueilli } from '../../../models';
import { FilterOperator, FilterPresentation } from '../../filter';
import { LieuMediationNumeriquePresentation } from '../lieu-mediation-numerique.presentation';

const shouldFilter = (filter: FilterPresentation) => filter.publics_accueillis != null && filter.publics_accueillis.length > 0;

const hasAtLeastOneOfTheFilterProperties =
  (filter: FilterPresentation) => (hasOneOfTheFilteredPublicAccueilli: boolean, publicAccueilliToFilter: PublicAccueilli) =>
    hasOneOfTheFilteredPublicAccueilli || (filter.publics_accueillis ?? []).includes(publicAccueilliToFilter);

export const publicsAccueillisFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation,
  filter: FilterPresentation
): boolean =>
  shouldFilter(filter)
    ? lieuMediationNumerique.publics_accueillis?.reduce(hasAtLeastOneOfTheFilterProperties(filter), false) ?? false
    : true;

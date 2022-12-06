import { PublicAccueilli } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { FilterOperator, FilterPresentation } from '../../filter';
import { LieuMediationNumeriquePresentation } from '../lieu-mediation-numerique.presentation';

const shouldApply = (publicsAccueillis?: PublicAccueilli[]): publicsAccueillis is PublicAccueilli[] =>
  publicsAccueillis != null && publicsAccueillis.length > 0;

const hasAtLeastOneOfTheFilterProperties =
  (publicsAccueillis: PublicAccueilli[]) =>
  (hasOneOfTheFilteredPublicAccueilli: boolean, publicAccueilliToFilter: PublicAccueilli) =>
    hasOneOfTheFilteredPublicAccueilli || publicsAccueillis.includes(publicAccueilliToFilter);

export const publicsAccueillisFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation,
  filter: FilterPresentation
): boolean =>
  shouldApply(filter.publics_accueillis)
    ? lieuMediationNumerique.publics_accueillis?.reduce(hasAtLeastOneOfTheFilterProperties(filter.publics_accueillis), false) ??
      false
    : true;

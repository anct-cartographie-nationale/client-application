import { PublicAccueilli } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { FilterOperator, FilterPresentation } from '../../filter';
import { LieuMediationNumeriquePresentation } from '../lieu-mediation-numerique.presentation';

const shouldApply = (publicsAccueillis?: PublicAccueilli[]): publicsAccueillis is PublicAccueilli[] =>
  publicsAccueillis != null && publicsAccueillis.length > 0;

const arePresentIn =
  (lieuMediationNumerique: LieuMediationNumeriquePresentation) =>
  (publicAccueilli: PublicAccueilli): boolean =>
    lieuMediationNumerique.publics_accueillis?.includes(publicAccueilli) ?? false;

export const publicsAccueillisFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation,
  filter: FilterPresentation
): boolean =>
  shouldApply(filter.publics_accueillis)
    ? filter.publics_accueillis.every(arePresentIn(lieuMediationNumerique)) ?? false
    : true;

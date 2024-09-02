import { PublicSpecifiquementAdresse } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { FilterOperator, FilterPresentation } from '../../filter';
import { LieuMediationNumeriquePresentation } from '../lieu-mediation-numerique.presentation';

const shouldApply = (
  publicsSpecifiquementAdresses?: PublicSpecifiquementAdresse[]
): publicsSpecifiquementAdresses is PublicSpecifiquementAdresse[] =>
  publicsSpecifiquementAdresses != null && publicsSpecifiquementAdresses.length > 0;

const arePresentIn =
  (lieuMediationNumerique: LieuMediationNumeriquePresentation) =>
  (publicSpecifiquementAdresse: PublicSpecifiquementAdresse): boolean =>
    lieuMediationNumerique.publics_specifiquement_adresses?.includes(publicSpecifiquementAdresse) ?? false;

export const publicsSpecifiquementAdressesFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation,
  filter: FilterPresentation
): boolean =>
  shouldApply(filter.publics_specifiquement_adresses)
    ? filter.publics_specifiquement_adresses.every(arePresentIn(lieuMediationNumerique)) ?? false
    : true;

import { DispositifProgrammeNational } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { FilterOperator, FilterPresentation } from '../../filter';
import { LieuMediationNumeriquePresentation } from '../lieu-mediation-numerique.presentation';

const shouldApply = (
  dispositifProgrammesNationaux?: DispositifProgrammeNational[]
): dispositifProgrammesNationaux is DispositifProgrammeNational[] =>
  dispositifProgrammesNationaux != null && dispositifProgrammesNationaux.length > 0;

const hasAtLeastOneOfTheFilterProperties =
  (dispositifProgrammesNationaux: DispositifProgrammeNational[]) =>
  (
    hasOneOfTheFilteredDispositifProgrammeNational: boolean,
    dispositifProgrammeNational: DispositifProgrammeNational
  ): boolean =>
    hasOneOfTheFilteredDispositifProgrammeNational || dispositifProgrammesNationaux.includes(dispositifProgrammeNational);

export const dispositifProgrammesNationauxFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation,
  filter: FilterPresentation
): boolean =>
  shouldApply(filter.dispositif_programmes_nationaux)
    ? lieuMediationNumerique.dispositif_programmes_nationaux?.reduce(
        hasAtLeastOneOfTheFilterProperties(filter.dispositif_programmes_nationaux),
        false
      ) ?? false
    : true;

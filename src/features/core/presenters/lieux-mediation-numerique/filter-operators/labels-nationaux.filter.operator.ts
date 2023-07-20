import { LabelNational } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { FilterOperator, FilterPresentation } from '../../filter';
import { LieuMediationNumeriquePresentation } from '../lieu-mediation-numerique.presentation';

const shouldApply = (labelNationaux?: LabelNational[]): labelNationaux is LabelNational[] =>
  labelNationaux != null && labelNationaux.length > 0;

const hasAtLeastOneOfTheFilterProperties =
  (labelNationaux: LabelNational[]) =>
  (hasOneOfTheFilteredLabelNational: boolean, labelNational: LabelNational): boolean =>
    hasOneOfTheFilteredLabelNational || labelNationaux.includes(labelNational);

export const labelsNationauxFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation,
  filter: FilterPresentation
): boolean =>
  shouldApply(filter.labels_nationaux)
    ? lieuMediationNumerique.labels_nationaux?.reduce(hasAtLeastOneOfTheFilterProperties(filter.labels_nationaux), false) ??
      false
    : true;

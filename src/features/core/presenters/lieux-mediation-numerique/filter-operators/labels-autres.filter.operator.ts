import { FilterOperator, FilterPresentation } from '../../filter';
import { LieuMediationNumeriquePresentation } from '../lieu-mediation-numerique.presentation';

const shouldApply = (labelsAutres?: string[]): labelsAutres is string[] => labelsAutres != null && labelsAutres.length > 0;

const hasAtLeastOneOfTheFilterProperties =
  (labelAutres: string[]) =>
  (hasOneOfTheFilteredLabelAutre: boolean, labelAutre: string): boolean =>
    hasOneOfTheFilteredLabelAutre || labelAutres.includes(labelAutre);

export const labelsAutresFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation,
  filter: FilterPresentation
): boolean =>
  shouldApply(filter.labels_autres)
    ? lieuMediationNumerique.labels_autres?.reduce(hasAtLeastOneOfTheFilterProperties(filter.labels_autres), false) ?? false
    : true;

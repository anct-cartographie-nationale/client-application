import { FilterOperator, FilterPresentation } from '../../filter';
import { LieuMediationNumeriquePresentation } from '../lieu-mediation-numerique.presentation';

const shouldApply = (formationsLabels?: string[]): formationsLabels is string[] =>
  formationsLabels != null && formationsLabels.length > 0;

const hasAtLeastOneOfTheFilterProperties =
  (formationsLabels: string[]) =>
  (hasOneOfTheFilteredFormationsLabels: boolean, formationLabel: string): boolean =>
    hasOneOfTheFilteredFormationsLabels || formationsLabels.includes(formationLabel);

export const formationsLabelsFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation,
  filter: FilterPresentation
): boolean =>
  shouldApply(filter.formations_labels)
    ? lieuMediationNumerique.formations_labels?.reduce(hasAtLeastOneOfTheFilterProperties(filter.formations_labels), false) ??
      false
    : true;

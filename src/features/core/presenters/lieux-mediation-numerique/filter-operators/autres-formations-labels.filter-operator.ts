import { FilterOperator, FilterPresentation } from '../../filter';
import { LieuMediationNumeriquePresentation } from '../lieu-mediation-numerique.presentation';

const shouldApply = (autresFormationsLabels?: string[]): autresFormationsLabels is string[] =>
  autresFormationsLabels != null && autresFormationsLabels.length > 0;

const hasAtLeastOneOfTheFilterProperties =
  (autresFormationsLabels: string[]) =>
  (hasOneOfTheFilteredAutresFormationsLabels: boolean, autreFormationLabel: string): boolean =>
    hasOneOfTheFilteredAutresFormationsLabels || autresFormationsLabels.includes(autreFormationLabel);

export const autresFormationsLabelsFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation,
  filter: FilterPresentation
): boolean =>
  shouldApply(filter.autres_formations_labels)
    ? lieuMediationNumerique.autres_formations_labels?.reduce(
        hasAtLeastOneOfTheFilterProperties(filter.autres_formations_labels),
        false
      ) ?? false
    : true;

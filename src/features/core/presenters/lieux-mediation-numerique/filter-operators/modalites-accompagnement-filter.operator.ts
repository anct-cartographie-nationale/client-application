import { ModaliteAccompagnement } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { FilterOperator, FilterPresentation } from '../../filter';
import { LieuMediationNumeriquePresentation } from '../lieu-mediation-numerique.presentation';

const shouldApply = (modaliteAccompagnement?: ModaliteAccompagnement[]): modaliteAccompagnement is ModaliteAccompagnement[] =>
  modaliteAccompagnement != null && modaliteAccompagnement.length > 0;

const hasAtLeastOneOfTheFilterProperties =
  (modalitesAccompagnement: ModaliteAccompagnement[]) =>
  (hasOneOfTheFilteredModalitesAccompagnement: boolean, modaliteAccompagnement: ModaliteAccompagnement) =>
    hasOneOfTheFilteredModalitesAccompagnement || modalitesAccompagnement.includes(modaliteAccompagnement);

export const modalitesAccompagnementFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation,
  filter: FilterPresentation
): boolean =>
  shouldApply(filter.modalites_accompagnement)
    ? lieuMediationNumerique.modalites_accompagnement?.reduce(
        hasAtLeastOneOfTheFilterProperties(filter.modalites_accompagnement),
        false
      ) ?? false
    : true;

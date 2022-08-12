import { ModalitesAccompagnement } from '../../../models';
import { FilterPresentation } from '../../filter';
import { LieuMediationNumeriquePresentation } from '../lieu-mediation-numerique.presentation';
import { FilterOperator } from '../lieux-mediation-numerique.presenter';

const shouldFilter = (filter: FilterPresentation) =>
  filter.modalites_accompagnement != null && filter.modalites_accompagnement.length > 0;

const hasAtLeastOneOfTheFilterProperties =
  (filter: FilterPresentation) =>
  (hasOneOfTheFilteredModalitesAccompagnement: boolean, modaliteAccompagnement: ModalitesAccompagnement) =>
    hasOneOfTheFilteredModalitesAccompagnement || (filter.modalites_accompagnement ?? []).includes(modaliteAccompagnement);

export const modalitesAccompagnementFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation,
  filter: FilterPresentation
): boolean =>
  shouldFilter(filter)
    ? lieuMediationNumerique.modalites_accompagnement?.reduce(hasAtLeastOneOfTheFilterProperties(filter), false) ?? false
    : true;

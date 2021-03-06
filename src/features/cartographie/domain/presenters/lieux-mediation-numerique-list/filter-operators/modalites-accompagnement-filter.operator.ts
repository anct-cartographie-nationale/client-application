import { FilterPresentation } from '../../../../../orientation/domain/presenters/filter/filter.presenter';
import { ModalitesAccompagnement } from '../../../../../../models';
import { LieuMediationNumeriqueListItemPresentation } from '../lieu-mediation-numerique-list-item.presentation';
import { FilterOperator } from '../lieux-mediation-numerique-list.presenter';

const shouldFilter = (filter: FilterPresentation) =>
  filter.modalites_accompagnement != null && filter.modalites_accompagnement.length > 0;

const hasAtLeastOneOfTheFilterProperties =
  (filter: FilterPresentation) =>
  (hasOneOfTheFilteredModalitesAccompagnement: boolean, modaliteAccompagnement: ModalitesAccompagnement) =>
    hasOneOfTheFilteredModalitesAccompagnement || (filter.modalites_accompagnement ?? []).includes(modaliteAccompagnement);

export const modalitesAccompagnementFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriqueListItemPresentation,
  filter: FilterPresentation
): boolean =>
  shouldFilter(filter)
    ? lieuMediationNumerique.modalites_accompagnement?.reduce(hasAtLeastOneOfTheFilterProperties(filter), false) ?? false
    : true;

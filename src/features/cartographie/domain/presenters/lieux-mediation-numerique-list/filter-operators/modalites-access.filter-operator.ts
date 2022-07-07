import { FilterPresentation } from '../../../../../orientation/domain/presenters/filter/filter.presenter';
import { ModalitesAccess } from '../../../../../../models/modalites-access';
import { LieuMediationNumeriqueListItemPresentation } from '../lieu-mediation-numerique-list-item.presentation';
import { FilterOperator } from '../lieux-mediation-numerique-list.presenter';

const shouldFilter = (filter: FilterPresentation) => filter.modalites_access != null && filter.modalites_access.length > 0;

const hasAtLeastOneOfTheFilterProperties =
  (filter: FilterPresentation) => (hasOneOfTheFilteredModaliteAccess: boolean, modaliteAccess: ModalitesAccess) =>
    hasOneOfTheFilteredModaliteAccess || (filter.modalites_access ?? []).includes(modaliteAccess);

export const modalitesAccessFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriqueListItemPresentation,
  filter: FilterPresentation
): boolean =>
  shouldFilter(filter)
    ? lieuMediationNumerique.modalites_access?.reduce(hasAtLeastOneOfTheFilterProperties(filter), false) ?? false
    : true;

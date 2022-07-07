import { LieuMediationNumeriqueListItemPresentation } from '../lieu-mediation-numerique-list-item.presentation';
import { FilterPresentation } from '../../../../../orientation/domain/presenters/filter/filter.presenter';
import { FilterOperator } from '../lieux-mediation-numerique-list.presenter';

export const serviceFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriqueListItemPresentation,
  filter: FilterPresentation
): boolean =>
  lieuMediationNumerique.services && filter.services ? lieuMediationNumerique.services.includes(filter.services) : true;

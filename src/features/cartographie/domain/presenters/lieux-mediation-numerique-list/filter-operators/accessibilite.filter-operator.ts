import { LieuMediationNumeriqueListItemPresentation } from '../lieu-mediation-numerique-list-item.presentation';
import { FilterPresentation } from '../../../../../orientation/domain/presenters/filter/filter.presenter';
import { FilterOperator } from '../lieux-mediation-numerique-list.presenter';

export const accessibiliteFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriqueListItemPresentation,
  filter: FilterPresentation
): boolean => (filter.accessibilite ? lieuMediationNumerique.accessibilite != null : true);

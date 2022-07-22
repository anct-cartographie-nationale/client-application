import { LieuMediationNumeriqueListItemPresentation } from '../lieu-mediation-numerique-list-item.presentation';
import { FilterPresentation } from '../../../../../orientation/domain/presenters/filter/filter.presenter';
import { FilterOperator } from '../lieux-mediation-numerique-list.presenter';
import { isOpen } from '../../horaires/horaires.presenter';

const applyFilter = (date: Date, horaires?: string, ouvertActuellement?: boolean): boolean =>
  horaires == null ? false : isOpen(date)(horaires, ouvertActuellement === true);

export const dateOuvertureFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriqueListItemPresentation,
  filter: FilterPresentation,
  date: Date
): boolean =>
  filter.date_ouverture
    ? applyFilter(
        new Date(filter.ouvert_actuellement ? date : filter.date_ouverture),
        lieuMediationNumerique.horaires,
        filter.ouvert_actuellement === 'true'
      )
    : true;

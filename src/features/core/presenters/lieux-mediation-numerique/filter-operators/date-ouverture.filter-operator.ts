import { FilterOperator, FilterPresentation } from '../../filter';
import { isOpen } from '../../horaires';
import { LieuMediationNumeriquePresentation } from '../lieu-mediation-numerique.presentation';

const applyFilter = (date: Date, horaires?: string, ouvertActuellement?: boolean): boolean =>
  horaires == null ? false : isOpen(date)(horaires, ouvertActuellement === true);

export const dateOuvertureFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation,
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

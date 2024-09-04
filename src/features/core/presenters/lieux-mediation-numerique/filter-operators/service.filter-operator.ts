import { FilterOperator, FilterPresentation } from '../../filter';
import { LieuMediationNumeriquePresentation } from '../lieu-mediation-numerique.presentation';
import { Service } from '@gouvfr-anct/lieux-de-mediation-numerique';

const shouldApply = (services?: Service[]): services is Service[] => services != null && services.length > 0;

const arePresentIn =
  (lieuMediationNumerique: LieuMediationNumeriquePresentation) =>
  (service: Service): boolean =>
    lieuMediationNumerique.services?.includes(service) ?? false;

export const serviceFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation,
  filter: FilterPresentation
): boolean => (shouldApply(filter.service) ? filter.service.every(arePresentIn(lieuMediationNumerique)) ?? false : true);

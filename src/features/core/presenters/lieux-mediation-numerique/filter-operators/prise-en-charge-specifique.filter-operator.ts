import { PriseEnChargeSpecifique } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { FilterOperator, FilterPresentation } from '../../filter';
import { LieuMediationNumeriquePresentation } from '../lieu-mediation-numerique.presentation';

const shouldApply = (
  prisesEnChargeSpecifiques?: PriseEnChargeSpecifique[]
): prisesEnChargeSpecifiques is PriseEnChargeSpecifique[] =>
  prisesEnChargeSpecifiques != null && prisesEnChargeSpecifiques.length > 0;

const arePresentIn =
  (lieuMediationNumerique: LieuMediationNumeriquePresentation) =>
  (priseEnChargeSpecifique: PriseEnChargeSpecifique): boolean =>
    lieuMediationNumerique.prise_en_charge_specifique?.includes(priseEnChargeSpecifique) ?? false;

export const priseEnChargeSpecifiqueFilterOperator: FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation,
  filter: FilterPresentation
): boolean =>
  shouldApply(filter.prise_en_charge_specifique)
    ? filter.prise_en_charge_specifique.every(arePresentIn(lieuMediationNumerique)) ?? false
    : true;

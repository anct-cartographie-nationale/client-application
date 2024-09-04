import { LieuMediationNumerique, Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import {
  LieuMediationNumeriquePresentation,
  toLieuxMediationNumeriquePresentation
} from '../lieu-mediation-numerique.presentation';
import { FilterOperator, FilterPresentation } from '../../filter';
import {
  fraisAChargeFilterOperator,
  horairesOuvertureFilterOperator,
  distanceFilterOperator,
  modalitesAccompagnementFilterOperator,
  publicsSpecifiquementAdressesFilterOperator,
  serviceFilterOperator,
  priseRdvFilterOperator,
  dispositifProgrammesNationauxFilterOperator,
  autresFormationsLabelsFilterOperator,
  ficheAccesLibreFilterOperator,
  priseEnChargeSpecifiqueFilterOperator,
  formationsLabelsFilterOperator
} from '../filter-operators';

const filterOperatorsMap: Map<string, FilterOperator> = new Map([
  ['distance', distanceFilterOperator],
  ['service', serviceFilterOperator],
  ['fiche_acces_libre', ficheAccesLibreFilterOperator],
  ['prise_rdv', priseRdvFilterOperator],
  ['frais_a_charge', fraisAChargeFilterOperator],
  ['publics_specifiquement_adresses', publicsSpecifiquementAdressesFilterOperator],
  ['prise_en_charge_specifique', priseEnChargeSpecifiqueFilterOperator],
  ['modalites_accompagnement', modalitesAccompagnementFilterOperator],
  ['dispositif_programmes_nationaux', dispositifProgrammesNationauxFilterOperator],
  ['formations_labels', formationsLabelsFilterOperator],
  ['autres_formations_labels', autresFormationsLabelsFilterOperator],
  ['horaires_ouverture', horairesOuvertureFilterOperator]
]);

const applyFilter = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation,
  date: Date,
  filter: FilterPresentation = {},
  operator?: FilterOperator
): boolean => (operator ? operator(lieuMediationNumerique, filter, date) : true);

const byOrientationFilter =
  (filter: FilterPresentation, date: Date) => (lieuMediationNumerique: LieuMediationNumeriquePresentation) =>
    Object.keys(filter).reduce(
      (filterResult: boolean, filterProperty: string) =>
        filterResult && applyFilter(lieuMediationNumerique, date, filter, filterOperatorsMap.get(filterProperty)),
      true
    );

export const onlyWithLocalisation = (
  lieuMediationNumerique: LieuMediationNumerique
): lieuMediationNumerique is LieuMediationNumerique & { localisation: Localisation } =>
  lieuMediationNumerique.localisation?.latitude != null &&
  lieuMediationNumerique.localisation?.longitude != null &&
  lieuMediationNumerique.localisation?.latitude !== 0 &&
  lieuMediationNumerique.localisation?.longitude !== 0;

export const filteredLieuxMediationNumerique = (
  lieuxMediationNumerique: LieuMediationNumerique[],
  localisation: Localisation,
  filter: FilterPresentation,
  date: Date
) =>
  lieuxMediationNumerique
    .filter(onlyWithLocalisation)
    .map(
      (lieuMediationNumerique: LieuMediationNumerique & { localisation: Localisation }): LieuMediationNumeriquePresentation =>
        toLieuxMediationNumeriquePresentation(lieuMediationNumerique, localisation)
    )
    .filter(byOrientationFilter(filter, date));

export const byDistance = (
  LieuMediationNumeriqueA: LieuMediationNumeriquePresentation,
  LieuMediationNumeriqueB: LieuMediationNumeriquePresentation
) => (LieuMediationNumeriqueA?.distance ?? 0) - (LieuMediationNumeriqueB?.distance ?? 0);

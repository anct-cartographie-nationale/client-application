import { LieuMediationNumerique, Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import {
  LieuMediationNumeriquePresentation,
  toLieuxMediationNumeriquePresentation
} from '../lieu-mediation-numerique.presentation';
import { FilterOperator, FilterPresentation } from '../../filter';
import {
  accessibiliteFilterOperator,
  conditionsAccesFilterOperator,
  horairesOuvertureFilterOperator,
  distanceFilterOperator,
  modalitesAccompagnementFilterOperator,
  publicsAccueillisFilterOperator,
  serviceFilterOperator
} from '../filter-operators';

const filterOperatorsMap: Map<string, FilterOperator> = new Map([
  ['distance', distanceFilterOperator],
  ['service', serviceFilterOperator],
  ['accessibilite', accessibiliteFilterOperator],
  ['conditions_acces', conditionsAccesFilterOperator],
  ['publics_accueillis', publicsAccueillisFilterOperator],
  ['modalites_accompagnement', modalitesAccompagnementFilterOperator],
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

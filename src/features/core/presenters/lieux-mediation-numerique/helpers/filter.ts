import {
  LieuMediationNumeriquePresentation,
  toLieuxMediationNumeriquePresentation
} from '../lieu-mediation-numerique.presentation';
import { FilterOperator, FilterPresentation } from '../../filter';
import {
  accessibiliteFilterOperator,
  conditionsAccessFilterOperator,
  dateOuvertureFilterOperator,
  distanceFilterOperator,
  modalitesAccompagnementFilterOperator,
  publicsAccueillisFilterOperator,
  serviceFilterOperator
} from '../filter-operators';
import { Localisation } from '../../../models';

const filterOperatorsMap: Map<string, FilterOperator> = new Map([
  ['distance', distanceFilterOperator],
  ['services', serviceFilterOperator],
  ['accessibilite', accessibiliteFilterOperator],
  ['conditions_access', conditionsAccessFilterOperator],
  ['publics_accueillis', publicsAccueillisFilterOperator],
  ['modalites_accompagnement', modalitesAccompagnementFilterOperator],
  ['date_ouverture', dateOuvertureFilterOperator]
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

export const filteredLieuxMediationNumerique = (
  lieuxMediationNumerique: LieuMediationNumeriquePresentation[],
  localisation: Localisation,
  filter: FilterPresentation,
  date: Date
) =>
  lieuxMediationNumerique
    .map((lieuMediationNumerique: LieuMediationNumeriquePresentation) =>
      toLieuxMediationNumeriquePresentation(lieuMediationNumerique, localisation, date)
    )
    .filter(byOrientationFilter(filter, date));

export const byDistance = (
  LieuMediationNumeriqueA: LieuMediationNumeriquePresentation,
  LieuMediationNumeriqueB: LieuMediationNumeriquePresentation
) => (LieuMediationNumeriqueA?.distance ?? 0) - (LieuMediationNumeriqueB?.distance ?? 0);

import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LieuxMediationNumeriqueRepository } from '../../repositories';
import { Localisation, NO_LOCALISATION, LieuMediationNumerique } from '../../../../../models';
import { LieuMediationNumeriqueListItemPresentation } from './lieu-mediation-numerique-list-item.presentation';
import { FilterPresentation } from '../../../../orientation/domain/presenters/filter/filter.presenter';
import {
  accessibiliteFilterOperator,
  distanceFilterOperator,
  conditionsAccessFilterOperator,
  publicsAccueillisFilterOperator,
  serviceFilterOperator,
  modalitesAccompagnementFilterOperator,
  dateOuvertureFilterOperator
} from './filter-operators';
import { gestionOuvertFerme } from '../horaires/horaires.presenter';
import { ifAny } from '../../../infrastructure/utilities';

const HALF_CIRCLE_DEGREE: number = 180;

const DEGREE_TO_RADIANS_FACTOR: number = Math.PI / HALF_CIRCLE_DEGREE;

const EARTH_DIAMETER_M: number = 12_742_000;

const HALF: number = 0.5;

/**
 * https://en.wikipedia.org/wiki/Haversine_formula (optimized with cos)
 */
const usingHaversineFormula = (
  latitudeARadian: number,
  latitudeBRadian: number,
  deltaLatitudeRadian: number,
  deltaLongitudeRadian: number
): number =>
  EARTH_DIAMETER_M *
  Math.asin(
    Math.sqrt(
      HALF *
        (1 -
          Math.cos(deltaLatitudeRadian) +
          Math.cos(latitudeARadian) * Math.cos(latitudeBRadian) * (1 - Math.cos(deltaLongitudeRadian)))
    )
  );

const geographicDistance = (coordinatesA: Localisation, coordinatesB: Localisation): number => {
  const latitudeARadian: number = coordinatesA.latitude * DEGREE_TO_RADIANS_FACTOR;
  const latitudeBRadian: number = coordinatesB.latitude * DEGREE_TO_RADIANS_FACTOR;
  const deltaLatitudeRadian: number = latitudeBRadian - latitudeARadian;
  const deltaLongitudeRadian: number = (coordinatesB.longitude - coordinatesA.longitude) * DEGREE_TO_RADIANS_FACTOR;

  return usingHaversineFormula(latitudeARadian, latitudeBRadian, deltaLatitudeRadian, deltaLongitudeRadian);
};

const toLieuxMediationNumeriqueMistItemPresentation = (
  lieuMediationNumerique: LieuMediationNumerique,
  localisation: Localisation,
  date: Date
): LieuMediationNumeriqueListItemPresentation =>
  localisation === NO_LOCALISATION
    ? {
        ...lieuMediationNumerique,
        ...ifAny('status', gestionOuvertFerme(lieuMediationNumerique.horaires, date))
      }
    : {
        ...lieuMediationNumerique,
        distance: geographicDistance(lieuMediationNumerique.localisation, localisation),
        ...ifAny('status', gestionOuvertFerme(lieuMediationNumerique.horaires, date))
      };

const byDistance = (
  LieuMediationNumeriqueA: LieuMediationNumeriqueListItemPresentation,
  LieuMediationNumeriqueB: LieuMediationNumeriqueListItemPresentation
) => (LieuMediationNumeriqueA?.distance ?? 0) - (LieuMediationNumeriqueB?.distance ?? 0);

export type FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriqueListItemPresentation,
  filter: FilterPresentation,
  date: Date
) => boolean;

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
  lieuMediationNumerique: LieuMediationNumeriqueListItemPresentation,
  date: Date,
  filter: FilterPresentation = {},
  operator?: FilterOperator
): boolean => (operator ? operator(lieuMediationNumerique, filter ?? {}, date) : true);

const byOrientationFilter =
  (filter: FilterPresentation, date: Date) => (lieuMediationNumerique: LieuMediationNumeriqueListItemPresentation) =>
    Object.keys(filter).reduce(
      (filterResult: boolean, filterProperty: string) =>
        filterResult && applyFilter(lieuMediationNumerique, date, filter, filterOperatorsMap.get(filterProperty)),
      true
    );

export class LieuxMediationNumeriqueListPresenter {
  public constructor(private readonly lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository) {}

  public lieuxMediationNumeriqueByDistance$(
    localisation$: Observable<Localisation>,
    filter$: Observable<FilterPresentation | undefined> = of(undefined),
    date: Date = new Date()
  ): Observable<LieuMediationNumeriqueListItemPresentation[]> {
    return combineLatest([this.lieuxMediationNumeriqueRepository.getAll$(), localisation$, filter$]).pipe(
      map(
        ([lieuxMediationNumerique, localisation, filter]: [
          LieuMediationNumerique[],
          Localisation,
          FilterPresentation?
        ]): LieuMediationNumeriqueListItemPresentation[] =>
          lieuxMediationNumerique
            .map((lieuMediationNumerique: LieuMediationNumeriqueListItemPresentation) =>
              toLieuxMediationNumeriqueMistItemPresentation(lieuMediationNumerique, localisation, date)
            )
            .filter(byOrientationFilter(filter ?? {}, date))
            .sort(byDistance)
      )
    );
  }

  public lieuxMediationNumeriqueTotal$(): Observable<LieuMediationNumerique[]> {
    return this.lieuxMediationNumeriqueRepository.getAll$();
  }
}

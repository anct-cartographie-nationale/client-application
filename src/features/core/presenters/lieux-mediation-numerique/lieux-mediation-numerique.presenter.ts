import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LieuMediationNumerique, Localisation, NO_LOCALISATION } from '../../models';
import { ifAny } from '../../utilities';
import { LieuxMediationNumeriqueRepository } from '../../repositories';
import { geographicDistance } from '../distance';
import { openingStatus } from '../horaires';
import { FilterPresentation } from '../filter';
import {
  accessibiliteFilterOperator,
  distanceFilterOperator,
  conditionsAccessFilterOperator,
  publicsAccueillisFilterOperator,
  serviceFilterOperator,
  modalitesAccompagnementFilterOperator,
  dateOuvertureFilterOperator
} from './filter-operators';
import { LieuMediationNumeriquePresentation } from './lieu-mediation-numerique.presentation';

const getDistance = (lieuMediationNumerique: LieuMediationNumerique, localisation: Localisation): number | undefined =>
  localisation === NO_LOCALISATION ? undefined : geographicDistance(lieuMediationNumerique.localisation, localisation);

const toLieuxMediationNumeriqueListItemPresentation = (
  lieuMediationNumerique: LieuMediationNumerique,
  localisation: Localisation,
  date: Date
): LieuMediationNumeriquePresentation => ({
  ...lieuMediationNumerique,
  ...ifAny('distance', getDistance(lieuMediationNumerique, localisation)),
  ...ifAny('status', openingStatus(date)(lieuMediationNumerique.horaires))
});

const byDistance = (
  LieuMediationNumeriqueA: LieuMediationNumeriquePresentation,
  LieuMediationNumeriqueB: LieuMediationNumeriquePresentation
) => (LieuMediationNumeriqueA?.distance ?? 0) - (LieuMediationNumeriqueB?.distance ?? 0);

export type FilterOperator = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation,
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

const isInBoundingBox = (localisation: Localisation, [topLeft, bottomRight]: [Localisation, Localisation]) =>
  localisation.latitude <= topLeft.latitude &&
  localisation.longitude >= topLeft.longitude &&
  localisation.latitude >= bottomRight.latitude &&
  localisation.longitude <= bottomRight.longitude;

const isValidBoundingBox = ([topLeft, bottomRight]: [Localisation, Localisation]) =>
  topLeft !== NO_LOCALISATION && bottomRight !== NO_LOCALISATION;

const byBoundingBox =
  (boundingBox: [Localisation, Localisation]) => (lieuMediationNumerique: LieuMediationNumeriquePresentation) =>
    !isValidBoundingBox(boundingBox) || isInBoundingBox(lieuMediationNumerique.localisation, boundingBox);

export class LieuxMediationNumeriquePresenter {
  public constructor(private readonly lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository) {}

  public lieuxMediationNumeriqueByDistance$(
    localisation$: Observable<Localisation>,
    filter$: Observable<FilterPresentation> = of({}),
    date: Date = new Date(),
    boundingBox$: Observable<[Localisation, Localisation]> = of([NO_LOCALISATION, NO_LOCALISATION])
  ): Observable<LieuMediationNumeriquePresentation[]> {
    return combineLatest([this.lieuxMediationNumeriqueRepository.getAll$(), localisation$, filter$, boundingBox$]).pipe(
      map(
        ([lieuxMediationNumerique, localisation, filter, boundingBox]: [
          LieuMediationNumerique[],
          Localisation,
          FilterPresentation,
          [Localisation, Localisation]
        ]): LieuMediationNumeriquePresentation[] =>
          lieuxMediationNumerique
            .map((lieuMediationNumerique: LieuMediationNumeriquePresentation) =>
              toLieuxMediationNumeriqueListItemPresentation(lieuMediationNumerique, localisation, date)
            )
            .filter(byOrientationFilter(filter, date))
            .filter(byBoundingBox(boundingBox))
            .sort(byDistance)
      )
    );
  }

  public lieuxMediationNumeriqueTotal$(): Observable<LieuMediationNumerique[]> {
    return this.lieuxMediationNumeriqueRepository.getAll$();
  }
}

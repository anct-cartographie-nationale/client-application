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
import { openingStatus } from '../horaires/horaires.presenter';
import { ifAny } from '../../../infrastructure/utilities';
import { geographicDistance } from '../distance/distance.presenter';

const getDistance = (lieuMediationNumerique: LieuMediationNumerique, localisation: Localisation): number | undefined =>
  localisation === NO_LOCALISATION ? undefined : geographicDistance(lieuMediationNumerique.localisation, localisation);

const toLieuxMediationNumeriqueMistItemPresentation = (
  lieuMediationNumerique: LieuMediationNumerique,
  localisation: Localisation,
  date: Date
): LieuMediationNumeriqueListItemPresentation => ({
  ...lieuMediationNumerique,
  ...ifAny('distance', getDistance(lieuMediationNumerique, localisation)),
  ...ifAny('status', openingStatus(date)(lieuMediationNumerique.horaires))
});

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

import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LieuMediationNumerique, Localisation, NO_LOCALISATION } from '../../models';
import { LieuxMediationNumeriqueRepository } from '../../repositories';
import {
  byLieuxCount,
  countLieuxInCollectiviteTerritoriale,
  definedDepartement,
  definedRegion,
  DepartementPresentation,
  RegionPresentation,
  toDepartement,
  toRegion
} from '../collectivite-territoriale';
import { FilterPresentation } from '../filter';
import { LieuMediationNumeriquePresentation } from './lieu-mediation-numerique.presentation';
import { byBoundingBox } from './helpers/bounding-box';
import { byDistance, filteredLieuxMediationNumerique } from './helpers/filter';

type LieuxMediationNumeriqueFilterParameters = [LieuMediationNumerique[], Localisation, FilterPresentation];

const toLieuxMediationNumeriqueByDistance =
  (date: Date) =>
  ([boundingBox, ...filterParameters]: [
    [Localisation, Localisation],
    ...LieuxMediationNumeriqueFilterParameters
  ]): LieuMediationNumeriquePresentation[] =>
    filteredLieuxMediationNumerique(...filterParameters, date)
      .filter(byBoundingBox(boundingBox))
      .sort(byDistance);

const toLieuxMediationNumeriqueByDepartement =
  (date: Date) =>
  ([boundingBox, ...filterParameters]: [
    [Localisation, Localisation],
    ...LieuxMediationNumeriqueFilterParameters
  ]): DepartementPresentation[] =>
    filteredLieuxMediationNumerique(...filterParameters, date)
      .map(toDepartement)
      .filter(definedDepartement)
      .filter(byBoundingBox(boundingBox))
      .reduce(countLieuxInCollectiviteTerritoriale as () => DepartementPresentation[], [])
      .sort(byLieuxCount);

const toLieuxMediationNumeriqueByRegion =
  (date: Date) =>
  ([boundingBox, ...filterParameters]: [
    [Localisation, Localisation],
    ...LieuxMediationNumeriqueFilterParameters
  ]): RegionPresentation[] =>
    filteredLieuxMediationNumerique(...filterParameters, date)
      .map(toRegion)
      .filter(definedRegion)
      .filter(byBoundingBox(boundingBox))
      .reduce(countLieuxInCollectiviteTerritoriale as () => RegionPresentation[], [])
      .sort(byLieuxCount);

export class LieuxMediationNumeriquePresenter {
  public constructor(private readonly lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository) {}

  public lieuxMediationNumeriqueByDistance$(
    localisation$: Observable<Localisation>,
    filter$: Observable<FilterPresentation> = of({}),
    date: Date = new Date(),
    boundingBox$: Observable<[Localisation, Localisation]> = of([NO_LOCALISATION, NO_LOCALISATION])
  ): Observable<LieuMediationNumeriquePresentation[]> {
    return combineLatest([boundingBox$, this.lieuxMediationNumeriqueRepository.getAll$(), localisation$, filter$]).pipe(
      map(toLieuxMediationNumeriqueByDistance(date))
    );
  }

  public lieuxMediationNumeriqueByDepartement$(
    localisation$: Observable<Localisation>,
    filter$: Observable<FilterPresentation> = of({}),
    date: Date = new Date(),
    boundingBox$: Observable<[Localisation, Localisation]> = of([NO_LOCALISATION, NO_LOCALISATION])
  ): Observable<DepartementPresentation[]> {
    return combineLatest([boundingBox$, this.lieuxMediationNumeriqueRepository.getAll$(), localisation$, filter$]).pipe(
      map(toLieuxMediationNumeriqueByDepartement(date))
    );
  }

  public lieuxMediationNumeriqueByRegion$(
    localisation$: Observable<Localisation>,
    filter$: Observable<FilterPresentation> = of({}),
    date: Date = new Date(),
    boundingBox$: Observable<[Localisation, Localisation]> = of([NO_LOCALISATION, NO_LOCALISATION])
  ): Observable<RegionPresentation[]> {
    return combineLatest([boundingBox$, this.lieuxMediationNumeriqueRepository.getAll$(), localisation$, filter$]).pipe(
      map(toLieuxMediationNumeriqueByRegion(date))
    );
  }

  public lieuxMediationNumeriqueTotal$(): Observable<LieuMediationNumerique[]> {
    return this.lieuxMediationNumeriqueRepository.getAll$();
  }
}

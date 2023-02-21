import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LieuxMediationNumeriqueRepository } from '../../repositories';
import {
  byLieuxCount,
  countLieuxInCollectiviteTerritoriale,
  onlyDefined,
  DepartementPresentation,
  FrancePresentation,
  RegionPresentation,
  toDepartement,
  toFrance,
  toRegion
} from '../collectivite-territoriale';
import { FilterPresentation } from '../filter';
import { LieuMediationNumeriquePresentation } from './lieu-mediation-numerique.presentation';
import { byBoundingBox } from './helpers/bounding-box';
import { byDistance, filteredLieuxMediationNumerique } from './helpers/filter';
import { LieuMediationNumerique, Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { NO_LOCALISATION } from '../../models';

type LieuxMediationNumeriqueFilterParameters = [LieuMediationNumerique[], Localisation, FilterPresentation];

const toLieuxMediationNumeriqueByDistance =
  (date: Date) =>
  ([boundingBox, lieux, localisation, filters]: [
    [Localisation, Localisation],
    ...LieuxMediationNumeriqueFilterParameters
  ]): LieuMediationNumeriquePresentation[] =>
    filteredLieuxMediationNumerique(lieux.filter(byBoundingBox(boundingBox)), localisation, filters, date).sort(byDistance);

const toLieuxMediationNumeriqueByDepartement =
  (date: Date) =>
  ([...filterParameters]: LieuxMediationNumeriqueFilterParameters): DepartementPresentation[] =>
    filteredLieuxMediationNumerique(...filterParameters, date)
      .map(toDepartement)
      .filter(onlyDefined)
      .reduce(countLieuxInCollectiviteTerritoriale as () => DepartementPresentation[], [])
      .sort(byLieuxCount);

const toLieuxMediationNumeriqueByRegion =
  (date: Date) =>
  ([...filterParameters]: LieuxMediationNumeriqueFilterParameters): RegionPresentation[] =>
    filteredLieuxMediationNumerique(...filterParameters, date)
      .map(toRegion)
      .filter(onlyDefined)
      .reduce(countLieuxInCollectiviteTerritoriale as () => RegionPresentation[], [])
      .sort(byLieuxCount);

const toLieuxMediationNumeriqueFrance =
  (date: Date) =>
  ([...filterParameters]: LieuxMediationNumeriqueFilterParameters): FrancePresentation[] =>
    filteredLieuxMediationNumerique(...filterParameters, date)
      .map(toFrance)
      .filter(onlyDefined)
      .reduce(countLieuxInCollectiviteTerritoriale as () => FrancePresentation[], []);

export class LieuxMediationNumeriquePresenter {
  public constructor(private readonly lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository) {}

  public lieuxMediationNumeriqueByDistance$(
    localisation$: Observable<Localisation>,
    filter$: Observable<FilterPresentation> = of({}),
    date: Date = new Date(),
    boundingBox$: Observable<[Localisation, Localisation]> = of([NO_LOCALISATION, NO_LOCALISATION])
  ): Observable<LieuMediationNumeriquePresentation[]> {
    return combineLatest([boundingBox$, this.lieuxMediationNumeriqueTotal$, localisation$, filter$]).pipe(
      map(toLieuxMediationNumeriqueByDistance(date))
    );
  }

  public lieuxMediationNumeriqueByDepartement$(
    localisation$: Observable<Localisation>,
    filter$: Observable<FilterPresentation> = of({}),
    date: Date = new Date()
  ): Observable<DepartementPresentation[]> {
    return combineLatest([this.lieuxMediationNumeriqueTotal$, localisation$, filter$]).pipe(
      map(toLieuxMediationNumeriqueByDepartement(date))
    );
  }

  public lieuxMediationNumeriqueByRegion$(
    localisation$: Observable<Localisation>,
    filter$: Observable<FilterPresentation> = of({}),
    date: Date = new Date()
  ): Observable<RegionPresentation[]> {
    return combineLatest([this.lieuxMediationNumeriqueTotal$, localisation$, filter$]).pipe(
      map(toLieuxMediationNumeriqueByRegion(date))
    );
  }

  public lieuxMediationNumeriqueFrance$(
    localisation$: Observable<Localisation>,
    filter$: Observable<FilterPresentation> = of({}),
    date: Date = new Date()
  ): Observable<FrancePresentation[]> {
    return combineLatest([this.lieuxMediationNumeriqueTotal$, localisation$, filter$]).pipe(
      map(toLieuxMediationNumeriqueFrance(date))
    );
  }

  public lieuxMediationNumeriqueTotal$: Observable<LieuMediationNumerique[]> = this.lieuxMediationNumeriqueRepository.getAll$();
}

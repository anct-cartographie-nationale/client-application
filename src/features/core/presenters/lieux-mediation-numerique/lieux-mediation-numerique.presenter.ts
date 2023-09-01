import { combineLatest, debounceTime, Observable, of } from 'rxjs';
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
import { ResultFoundPresentation, Searchable } from '../../../adresse';
import { NO_LOCALISATION } from '../../models';
import { WithLieuxCount } from '../collectivite-territoriale';

type LieuxMediationNumeriqueFilterParameters = [LieuMediationNumerique[], Localisation, FilterPresentation];

const LIEUX_ZOOM_LEVEL: number = 9;
const MAP_INTERACTION_DEBOUNCE_TIME: number = 300;

const toLieuxMediationNumeriqueByDistance =
  (date: Date) =>
  ([boundingBox, lieux, localisation, filters, zoomLevel]: [
    [Localisation, Localisation],
    ...LieuxMediationNumeriqueFilterParameters,
    number
  ]): LieuMediationNumeriquePresentation[] => {
    const stayInLieuxZoom: boolean = filters.distance ? filters.distance >= 50000 && filters.distance <= 100000 : false;
    return zoomLevel < (stayInLieuxZoom ? LIEUX_ZOOM_LEVEL - 1 : LIEUX_ZOOM_LEVEL)
      ? []
      : filteredLieuxMediationNumerique(lieux.filter(byBoundingBox(boundingBox)), localisation, filters, date).sort(byDistance);
  };

const toLieuxMediationNumeriqueByDepartement =
  (date: Date) =>
  ([...filterParameters]: LieuxMediationNumeriqueFilterParameters): WithLieuxCount<DepartementPresentation[]> =>
    ((lieux: LieuMediationNumeriquePresentation[]): WithLieuxCount<DepartementPresentation[]> => ({
      payload: lieux
        .map(toDepartement)
        .filter(onlyDefined)
        .reduce(countLieuxInCollectiviteTerritoriale as () => DepartementPresentation[], []),
      lieuxCount: lieux.length
    }))(filteredLieuxMediationNumerique(...filterParameters, date));

const toLieuxMediationNumeriqueByRegion =
  (date: Date) =>
  ([...filterParameters]: LieuxMediationNumeriqueFilterParameters): WithLieuxCount<RegionPresentation[]> =>
    ((lieux: LieuMediationNumeriquePresentation[]): WithLieuxCount<RegionPresentation[]> => ({
      payload: lieux
        .map(toRegion)
        .filter(onlyDefined)
        .reduce(countLieuxInCollectiviteTerritoriale as () => RegionPresentation[], []),
      lieuxCount: lieux.length
    }))(filteredLieuxMediationNumerique(...filterParameters, date));

const toLieuxMediationNumeriqueFrance =
  (date: Date) =>
  ([...filterParameters]: LieuxMediationNumeriqueFilterParameters) =>
    ((lieux: LieuMediationNumeriquePresentation[]): WithLieuxCount<FrancePresentation[]> => ({
      payload: lieux
        .map(toFrance)
        .filter(onlyDefined)
        .reduce(countLieuxInCollectiviteTerritoriale as () => FrancePresentation[], []),
      lieuxCount: lieux.length
    }))(filteredLieuxMediationNumerique(...filterParameters, date));

const toResultFound = ({
  id,
  adresse,
  nom,
  localisation
}: LieuMediationNumerique & {
  localisation: Localisation;
}): ResultFoundPresentation<{ id: string }> => ({
  context: `${adresse.voie} ${adresse.code_postal}, ${adresse.commune}`,
  label: nom,
  payload: { id },
  localisation
});

const onlyNomMatching =
  (searchTerm: string) =>
  (
    lieu: LieuMediationNumerique
  ): lieu is LieuMediationNumerique & {
    localisation: Localisation;
  } =>
    lieu.nom.toLowerCase().includes(searchTerm.toLowerCase()) && lieu.localisation != null;

export class LieuxMediationNumeriquePresenter implements Searchable<{ id: string }> {
  public constructor(private readonly lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository) {}

  public lieuxMediationNumeriqueByDistance$(
    localisation$: Observable<Localisation>,
    filter$: Observable<FilterPresentation> = of({}),
    date: Date = new Date(),
    boundingBox$: Observable<[Localisation, Localisation]> = of([NO_LOCALISATION, NO_LOCALISATION]),
    zoomLevel$: Observable<number> = of(LIEUX_ZOOM_LEVEL)
  ): Observable<LieuMediationNumeriquePresentation[]> {
    return combineLatest([boundingBox$, this.lieuxMediationNumerique$, localisation$, filter$, zoomLevel$]).pipe(
      debounceTime(MAP_INTERACTION_DEBOUNCE_TIME),
      map(toLieuxMediationNumeriqueByDistance(date))
    );
  }

  public lieuxMediationNumeriqueByDepartement$(
    localisation$: Observable<Localisation>,
    filter$: Observable<FilterPresentation> = of({}),
    date: Date = new Date()
  ): Observable<WithLieuxCount<DepartementPresentation[]>> {
    return combineLatest([this.lieuxMediationNumerique$, localisation$, filter$]).pipe(
      debounceTime(MAP_INTERACTION_DEBOUNCE_TIME),
      map(toLieuxMediationNumeriqueByDepartement(date))
    );
  }

  public lieuxMediationNumeriqueByRegion$(
    localisation$: Observable<Localisation>,
    filter$: Observable<FilterPresentation> = of({}),
    date: Date = new Date()
  ): Observable<WithLieuxCount<RegionPresentation[]>> {
    return combineLatest([this.lieuxMediationNumerique$, localisation$, filter$]).pipe(
      debounceTime(MAP_INTERACTION_DEBOUNCE_TIME),
      map(toLieuxMediationNumeriqueByRegion(date))
    );
  }

  public lieuxMediationNumeriqueFrance$(
    localisation$: Observable<Localisation>,
    filter$: Observable<FilterPresentation> = of({}),
    date: Date = new Date()
  ): Observable<WithLieuxCount<FrancePresentation[]>> {
    return combineLatest([this.lieuxMediationNumerique$, localisation$, filter$]).pipe(
      debounceTime(MAP_INTERACTION_DEBOUNCE_TIME),
      map(toLieuxMediationNumeriqueFrance(date))
    );
  }

  public search$(searchTerm: string, limit: number = 5): Observable<ResultFoundPresentation<{ id: string }>[]> {
    return this.lieuxMediationNumerique$.pipe(
      map((lieux: LieuMediationNumerique[]): ResultFoundPresentation<{ id: string }>[] =>
        lieux.filter(onlyNomMatching(searchTerm)).slice(0, limit).map(toResultFound)
      )
    );
  }

  public lieuxMediationNumerique$: Observable<LieuMediationNumerique[]> = this.lieuxMediationNumeriqueRepository.getAll$();
}

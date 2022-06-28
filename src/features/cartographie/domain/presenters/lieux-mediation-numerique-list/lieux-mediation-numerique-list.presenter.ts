import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LieuxMediationNumeriqueRepository } from '../../repositories';
import { Coordinates, NO_COORDINATES } from '../../value-objects';
import { LieuMediationNumerique } from '../../../../../models/lieu-mediation-numerique/lieu-mediation-numerique';

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

const geographicDistance = (coordinatesA: Coordinates, coordinatesB: Coordinates): number => {
  const latitudeARadian: number = coordinatesA.latitude * DEGREE_TO_RADIANS_FACTOR;
  const latitudeBRadian: number = coordinatesB.latitude * DEGREE_TO_RADIANS_FACTOR;
  const deltaLatitudeRadian: number = latitudeBRadian - latitudeARadian;
  const deltaLongitudeRadian: number = (coordinatesB.longitude - coordinatesA.longitude) * DEGREE_TO_RADIANS_FACTOR;

  return usingHaversineFormula(latitudeARadian, latitudeBRadian, deltaLatitudeRadian, deltaLongitudeRadian);
};

// todo: add distance
const toLieuxMediationNumeriqueWithDistance = (
  lieuMediationNumerique: LieuMediationNumerique,
  coordinates: Coordinates
): LieuMediationNumerique =>
  coordinates === NO_COORDINATES
    ? lieuMediationNumerique
    : {
        ...lieuMediationNumerique
        // distance: geographicDistance(
        //   {
        //     latitude: lieuMediationNumerique.getLat(),
        //     longitude: lieuMediationNumerique.getLon()
        //   },
        //   coordinates
        // )
      };

const byDistance = (LieuMediationNumeriqueA: LieuMediationNumerique, LieuMediationNumeriqueB: LieuMediationNumerique) => 0;
// (LieuMediationNumeriqueA?.distance ?? 0) - (LieuMediationNumeriqueB?.distance ?? 0);

export class LieuxMediationNumeriqueListPresenter {
  public constructor(private readonly lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository) {}

  public lieuxMediationNumeriqueByDistance$(
    location$: Observable<Coordinates>,
    filter$: Observable<string> = of('')
  ): Observable<LieuMediationNumerique[]> {
    return combineLatest([this.lieuxMediationNumeriqueRepository.getAll$(), location$, filter$]).pipe(
      map(
        ([lieuxMediationNumerique, coordinates, filter]: [
          LieuMediationNumerique[],
          Coordinates,
          string
        ]): LieuMediationNumerique[] =>
          lieuxMediationNumerique
            .map((lieuMediationNumerique: LieuMediationNumerique) =>
              toLieuxMediationNumeriqueWithDistance(lieuMediationNumerique, coordinates)
            )
            .filter((lieuMediationNumerique: LieuMediationNumerique) => {
              return filter ? lieuMediationNumerique.id === filter : true;
            })
            .sort(byDistance)
      )
    );
  }
}

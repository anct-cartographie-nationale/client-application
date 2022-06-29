import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LieuxMediationNumeriqueRepository } from '../../repositories';
import { LieuMediationNumerique } from '../../../../../models/lieu-mediation-numerique/lieu-mediation-numerique';
import { Localisation, NO_LOCALISATION } from '../../../../../models/localisation/localisation';
import { LieuMediationNumeriqueListItemPresentation } from './lieu-mediation-numerique-list-item.presentation';

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

// todo: add distance
const toLieuxMediationNumeriqueMistItemPresentation = (
  lieuMediationNumerique: LieuMediationNumerique,
  localisation: Localisation
): LieuMediationNumeriqueListItemPresentation =>
  localisation === NO_LOCALISATION
    ? lieuMediationNumerique
    : {
        ...lieuMediationNumerique,
        distance: geographicDistance(lieuMediationNumerique.localisation, localisation)
      };

const byDistance = (
  LieuMediationNumeriqueA: LieuMediationNumeriqueListItemPresentation,
  LieuMediationNumeriqueB: LieuMediationNumeriqueListItemPresentation
) => (LieuMediationNumeriqueA?.distance ?? 0) - (LieuMediationNumeriqueB?.distance ?? 0);

const filterByType = (lieuMediationNumerique: LieuMediationNumerique, filter: any) => {
  let condition: boolean = true;
  filter.map((label: any) => {
    switch (label.type) {
      case 'modalites':
        return (condition = lieuMediationNumerique.modalites_access?.includes(label.name) || false);
      case 'services':
        return (condition = lieuMediationNumerique.services?.includes(label.name) || false);
      default:
        return false;
    }
  });
  return condition;
};

export class LieuxMediationNumeriqueListPresenter {
  public constructor(private readonly lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository) {}

  public lieuxMediationNumeriqueByDistance$(
    location$: Observable<Localisation>,
    filter$: Observable<{ name: string; type: string }[]> = of([{ name: '', type: '' }])
    // typeOfFilter$: Observable<string> = of('')
  ): Observable<LieuMediationNumeriqueListItemPresentation[]> {
    return combineLatest([this.lieuxMediationNumeriqueRepository.getAll$(), location$, filter$]).pipe(
      map(
        ([lieuxMediationNumerique, coordinates, filter]: [
          LieuMediationNumerique[],
          Localisation,
          any
        ]): LieuMediationNumeriqueListItemPresentation[] =>
          lieuxMediationNumerique
            .map((lieuMediationNumerique: LieuMediationNumeriqueListItemPresentation) =>
              toLieuxMediationNumeriqueMistItemPresentation(lieuMediationNumerique, coordinates)
            )
            .filter((lieuMediationNumerique: LieuMediationNumeriqueListItemPresentation) => {
              return Object.values(filter).length > 0 ? filterByType(lieuMediationNumerique, filter) : true;
            })
            .sort(byDistance)
      )
    );
  }

  public lieuxMediationNumeriqueTotal$(): Observable<LieuMediationNumerique[]> {
    return combineLatest([this.lieuxMediationNumeriqueRepository.getAll$()]).pipe(
      map(([lieuxMediationNumerique]: [LieuMediationNumerique[]]): LieuMediationNumerique[] =>
        lieuxMediationNumerique.map((lieuMediationNumerique: LieuMediationNumerique) => lieuMediationNumerique).sort(byDistance)
      )
    );
  }
}

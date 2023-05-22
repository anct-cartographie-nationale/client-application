import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { geographicDistance } from '../../../core/presenters';
import { Coordinateur } from '../../models';
import { ConseillersRepository, CoordinateursRepository } from '../../reporitories';
import { ConseillerDetailsPresentation, CoordinateurDetailsPresentation } from './coordinateur-details.presentation';

const toCoordinateurDetailsPresentation = (
  coordinateur: Coordinateur | undefined
): CoordinateurDetailsPresentation | undefined =>
  coordinateur == null
    ? undefined
    : {
        id: coordinateur.id,
        nom: `${coordinateur.prenom} ${coordinateur.nom}`,
        adresse: coordinateur.adresse,
        commune: `${coordinateur.commune} (${coordinateur.codePostal})`,
        courriel: coordinateur.courriel,
        telephone: coordinateur.telephone,
        perimetre: coordinateur.perimetre,
        nombreDePersonnesCoordonnees: coordinateur.nombreDePersonnesCoordonnees,
        nombreDeStructuresAvecDesPersonnesCoordonnees: coordinateur.nombreDeStructuresAvecDesPersonnesCoordonnees,
        dispositif: coordinateur.dispositif,
        latitude: coordinateur.latitude,
        longitude: coordinateur.longitude
      };

const onlyCoordonneBy =
  (coordinateur: CoordinateurDetailsPresentation) =>
  (conseiller: Omit<ConseillerDetailsPresentation, 'distance'>): boolean =>
    conseiller.coordinateurs?.some(({ id }: { id: string }): boolean => coordinateur.id === id) ?? false;

const toDistanceFrom =
  (coordinateur: CoordinateurDetailsPresentation) =>
  (conseiller: Omit<ConseillerDetailsPresentation, 'distance'>): number =>
    geographicDistance(
      Localisation({ latitude: coordinateur.latitude, longitude: coordinateur.longitude }),
      Localisation({ latitude: conseiller.latitude, longitude: conseiller.longitude })
    );

const toConseillersWithDistance =
  (coordinateur: CoordinateurDetailsPresentation) =>
  (conseiller: Omit<ConseillerDetailsPresentation, 'distance'>): ConseillerDetailsPresentation => ({
    ...conseiller,
    distance: toDistanceFrom(coordinateur)(conseiller)
  });

const toConseillerCoordonnesPar =
  (coordinateur: CoordinateurDetailsPresentation) =>
  (conseillers: Omit<ConseillerDetailsPresentation, 'distance'>[]): ConseillerDetailsPresentation[] =>
    conseillers.filter(onlyCoordonneBy(coordinateur)).map(toConseillersWithDistance(coordinateur));

const byFarthestDistance = (conseillerA: ConseillerDetailsPresentation, conseillerB: ConseillerDetailsPresentation): number =>
  conseillerB.distance - conseillerA.distance;

const COORDINATEUR_PERIMETER: 1000 = 1000 as const;

const onlyInPerimeter = (toConseillersWithDistance: ConseillerDetailsPresentation): boolean =>
  toConseillersWithDistance.distance < COORDINATEUR_PERIMETER;

const onlyOtherConseillers =
  (coordinateur: CoordinateurDetailsPresentation) => (conseiller: Omit<ConseillerDetailsPresentation, 'distance'>) =>
    conseiller.coordinateurs?.every(({ id }: { id: string }): boolean => coordinateur.id !== id) ?? true;

const toCoordinateurMatching =
  (id: string) =>
  (coordinateurs: Coordinateur[]): Coordinateur | undefined =>
    coordinateurs.find((coordinateur: Coordinateur): boolean => coordinateur.id === id);

export class CoordinateurDetailsPresenter {
  public constructor(
    private readonly _conseillersRepository: ConseillersRepository,
    private readonly _coordinateursRepository: CoordinateursRepository
  ) {}

  public coordinateur$ = (id: string): Observable<CoordinateurDetailsPresentation | undefined> =>
    this._coordinateursRepository.getAll$().pipe(map(toCoordinateurMatching(id)), map(toCoordinateurDetailsPresentation));

  public conseillersCoordonnesPar$ = (
    coordinateur: CoordinateurDetailsPresentation
  ): Observable<ConseillerDetailsPresentation[]> =>
    this._conseillersRepository.getAll$().pipe(map(toConseillerCoordonnesPar(coordinateur)));

  public farthestConseillerDistance$ = (coordinateur: CoordinateurDetailsPresentation): Observable<number> =>
    this.conseillersCoordonnesPar$(coordinateur).pipe(
      map((conseillers: ConseillerDetailsPresentation[]): number => conseillers.sort(byFarthestDistance)[0].distance)
    );

  public allConseillersInPerimeterOf$ = (
    coordinateur: CoordinateurDetailsPresentation
  ): Observable<ConseillerDetailsPresentation[]> =>
    this._conseillersRepository
      .getAll$()
      .pipe(
        map((conseillers: Omit<ConseillerDetailsPresentation, 'distance'>[]): ConseillerDetailsPresentation[] =>
          conseillers
            .filter(onlyOtherConseillers(coordinateur))
            .map(toConseillersWithDistance(coordinateur))
            .filter(onlyInPerimeter)
        )
      );
}

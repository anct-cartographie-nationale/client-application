import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { geographicDistance } from '../../../core';
import coordinateursData from '../../data/coordinateurs.json';
import conseillersData from '../../data/conseillers.json';
import { ConseillerDetailsPresentation, CoordinateurDetailsPresentation } from './coordinateur-details.presentation';

const toCoordinateurDetailsPresentation = (coordinateur: any): CoordinateurDetailsPresentation => ({
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
});

const onlyCoordonneBy =
  (coordinateur: CoordinateurDetailsPresentation) =>
  (conseiller: Omit<ConseillerDetailsPresentation, 'distance'>): boolean =>
    conseiller.coordinateurId === coordinateur.id;

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

export class CoordinateurDetailsPresenter {
  public coordinateur$ = (id: string): Observable<CoordinateurDetailsPresentation | undefined> =>
    of(
      (coordinateursData as any[]).find((coordinateur: CoordinateurDetailsPresentation): boolean => coordinateur.id === id)
    ).pipe(map(toCoordinateurDetailsPresentation));

  public conseillersCoordonnesPar$ = (
    coordinateur: CoordinateurDetailsPresentation
  ): Observable<ConseillerDetailsPresentation[]> => of(conseillersData).pipe(map(toConseillerCoordonnesPar(coordinateur)));

  public farthestConseillerDistance$ = (coordinateur: CoordinateurDetailsPresentation): Observable<number> =>
    this.conseillersCoordonnesPar$(coordinateur).pipe(
      map((conseillers: ConseillerDetailsPresentation[]): number => conseillers.sort(byFarthestDistance)[0].distance)
    );

  public allConseillersInPerimeterOf$(
    coordinateur: CoordinateurDetailsPresentation
  ): Observable<ConseillerDetailsPresentation[]> {
    return of(conseillersData).pipe(
      map((conseillers: Omit<ConseillerDetailsPresentation, 'distance'>[]): ConseillerDetailsPresentation[] =>
        conseillers
          .map(toConseillersWithDistance(coordinateur))
          .filter(
            (toConseillersWithDistance: ConseillerDetailsPresentation): boolean =>
              toConseillersWithDistance.distance < 1000 && toConseillersWithDistance.coordinateurId == null
          )
      )
    );
  }
}

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import coordinateurs from '../../data/coordinateurs.json';
import { CoordinateurDetailsPresentation } from './coordinateur-details.presentation';

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
  longitude: coordinateur.longitude,
  ifn: coordinateur.ifn
});

export class CoordinateurDetailsPresenter {
  public coordinateur$ = (id: string): Observable<CoordinateurDetailsPresentation | undefined> =>
    of((coordinateurs as any[]).find((coordinateur: CoordinateurDetailsPresentation): boolean => coordinateur.id === id)).pipe(
      map(toCoordinateurDetailsPresentation)
    );
}

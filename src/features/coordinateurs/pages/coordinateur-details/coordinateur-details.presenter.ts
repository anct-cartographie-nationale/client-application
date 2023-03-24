import { Observable, of } from 'rxjs';
import { CoordinateurDetailsPresentation } from './coordinateur-details.presentation';
import coordinateurs from '../../data/coordinateurs.json';

export class CoordinateurDetailsPresenter {
  public coordinateur$(id: string): Observable<CoordinateurDetailsPresentation | undefined> {
    return of(
      (coordinateurs as CoordinateurDetailsPresentation[]).find(
        (coordinateur: CoordinateurDetailsPresentation) => coordinateur.id === id
      )
    );
  }
}

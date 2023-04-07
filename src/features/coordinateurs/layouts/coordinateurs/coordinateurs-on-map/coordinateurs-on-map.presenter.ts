import { Observable, of } from 'rxjs';
import coordinateursData from '../../../data/coordinateurs.json';
import { CoordinateurOnMapPresentation } from '../../../presenters';

export class CoordinateursOnMapPresenter {
  public coordinateurs$ = (): Observable<CoordinateurOnMapPresentation[]> =>
    of(coordinateursData as CoordinateurOnMapPresentation[]);
}

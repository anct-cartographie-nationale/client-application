import { Observable } from 'rxjs';
import { CoordinateurOnMapPresentation } from '../../../presenters';
import { CoordinateursRepository } from '../../../reporitories';

export class CoordinateursOnMapPresenter {
  public constructor(private readonly _coordinateurs: CoordinateursRepository) {}

  public coordinateurs$ = (): Observable<CoordinateurOnMapPresentation[]> => this._coordinateurs.getAll$();
}

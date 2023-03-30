import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import coordinateursData from '../../data/coordinateurs.json';
import { CoordinateursFilterPresentation, DEFAULT_FILTER, toFilteredCoordinateurs } from '../../presenters';
import { CoordinateursListItemPresentation } from './coordinateurs-list.presentation';

export class CoordinateursListPresenter {
  public coordinateurs$ = (
    coordinateursFilter$: Observable<CoordinateursFilterPresentation> = of(DEFAULT_FILTER)
  ): Observable<CoordinateursListItemPresentation[]> =>
    combineLatest([of(coordinateursData as CoordinateursListItemPresentation[]), coordinateursFilter$]).pipe(
      map(toFilteredCoordinateurs)
    );
}

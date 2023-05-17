import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoordinateursRepository } from '../../reporitories';
import { CoordinateursSortPresentation, DEFAULT_SORT, By } from '../../presenters';
import { CoordinateursListItemPresentation } from './coordinateurs-list.presentation';

const SORT_BY_FIELD: Record<
  By,
  (coordinateurA: CoordinateursListItemPresentation, coordinateurB: CoordinateursListItemPresentation) => number
> = {
  nom: (coordinateurA: CoordinateursListItemPresentation, coordinateurB: CoordinateursListItemPresentation): number =>
    coordinateurA.nom.localeCompare(coordinateurB.nom),
  codePostal: (coordinateurA: CoordinateursListItemPresentation, coordinateurB: CoordinateursListItemPresentation): number =>
    coordinateurA.codePostal.localeCompare(coordinateurB.codePostal),
  nombreCnfs: (coordinateurA: CoordinateursListItemPresentation, coordinateurB: CoordinateursListItemPresentation): number =>
    coordinateurA.nombreDePersonnesCoordonnees - coordinateurB.nombreDePersonnesCoordonnees
};

const applySortDirection = (sort: CoordinateursSortPresentation): 1 | -1 => (sort.direction === 'asc' ? 1 : -1);

const bySelectedField =
  (sort: CoordinateursSortPresentation) =>
  (coordinateurA: CoordinateursListItemPresentation, coordinateurB: CoordinateursListItemPresentation): number =>
    SORT_BY_FIELD[sort.by](coordinateurA, coordinateurB) * applySortDirection(sort);

const toOrderedCoordinateurs = ([coordinateurs, sort]: [
  CoordinateursListItemPresentation[],
  CoordinateursSortPresentation
]): CoordinateursListItemPresentation[] => coordinateurs.sort(bySelectedField(sort));

export class CoordinateursListPresenter {
  public constructor(private readonly _coordinateurs: CoordinateursRepository) {}

  public coordinateurs$ = (
    coordinateursSort$: Observable<CoordinateursSortPresentation> = of(DEFAULT_SORT)
  ): Observable<CoordinateursListItemPresentation[]> =>
    combineLatest([this._coordinateurs.getAll$(), coordinateursSort$]).pipe(map(toOrderedCoordinateurs));
}

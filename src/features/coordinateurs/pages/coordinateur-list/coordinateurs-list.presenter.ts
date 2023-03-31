import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import coordinateursData from '../../data/coordinateurs.json';
import {
  CoordinateursFilterPresentation,
  CoordinateursSortPresentation,
  DEFAULT_FILTER,
  toFilteredCoordinateurs,
  DEFAULT_SORT,
  By
} from '../../presenters';
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

const toOrderedCoordinateurs = ([coordinateurs, filter, sort]: [
  CoordinateursListItemPresentation[],
  CoordinateursFilterPresentation,
  CoordinateursSortPresentation
]): [CoordinateursListItemPresentation[], CoordinateursFilterPresentation] => [
  coordinateurs.sort(bySelectedField(sort)),
  filter
];

export class CoordinateursListPresenter {
  public coordinateurs$ = (
    coordinateursFilter$: Observable<CoordinateursFilterPresentation> = of(DEFAULT_FILTER),
    coordinateursSort$: Observable<CoordinateursSortPresentation> = of(DEFAULT_SORT)
  ): Observable<CoordinateursListItemPresentation[]> =>
    combineLatest([
      of(coordinateursData as CoordinateursListItemPresentation[]),
      coordinateursFilter$,
      coordinateursSort$
    ]).pipe(map(toOrderedCoordinateurs), map(toFilteredCoordinateurs));
}

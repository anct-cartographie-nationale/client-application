export type By = 'nom' | 'codePostal' | 'nombreCnfs';

export type Direction = 'asc' | 'desc';

export type CoordinateursSortPresentation = {
  by: By;
  direction: Direction;
};

import { Localisation } from '../../../models';

export type Bounds = {
  north: number;
  south: number;
  east: number;
  west: number;
};

export type DepartementPresentation = {
  code: string;
  nom: string;
  bounds: Bounds;
  localisation: Localisation;
};

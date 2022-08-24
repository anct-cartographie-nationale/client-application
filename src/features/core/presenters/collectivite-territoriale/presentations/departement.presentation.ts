import { Localisation } from '../../../models';

export type DepartementPresentation = {
  code: string;
  nom: string;
  zoom: number;
  lieuxCount?: number;
  localisation: Localisation;
};

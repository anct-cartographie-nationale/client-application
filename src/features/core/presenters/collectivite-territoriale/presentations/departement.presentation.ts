import { Localisation } from '../../../models';

export type DepartementPresentation = {
  code: string;
  nom: string;
  lieuxCount?: number;
  localisation: Localisation;
};

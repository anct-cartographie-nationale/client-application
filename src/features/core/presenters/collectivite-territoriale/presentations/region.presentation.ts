import { Localisation } from '../../../models';

export type RegionPresentation = {
  code: string;
  nom: string;
  departements: string[];
  lieuxCount?: number;
  localisation: Localisation;
};

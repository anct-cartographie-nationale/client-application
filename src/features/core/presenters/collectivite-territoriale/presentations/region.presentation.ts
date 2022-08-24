import { Localisation } from '../../../models';

export type RegionPresentation = {
  code: string;
  nom: string;
  departements: string[];
  zoom: number;
  lieuxCount?: number;
  localisation: Localisation;
};

import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';

export type RegionPresentation = {
  code: string;
  nom: string;
  departements: string[];
  zoom: number;
  lieuxCount?: number;
  localisation: Localisation;
};

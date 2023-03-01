import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';

export type Hub = {
  nom: string;
  source?: string;
  url?: string;
};

export type RegionPresentation = {
  code: string;
  nom: string;
  departements: string[];
  zoom: number;
  lieuxCount?: number;
  localisation: Localisation;
  hub?: Hub;
};

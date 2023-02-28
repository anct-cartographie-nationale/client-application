import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';

export type FrancePresentation = {
  code: string;
  nom: string;
  regions: string[];
  zoom: number;
  lieuxCount?: number;
  localisation: Localisation;
};

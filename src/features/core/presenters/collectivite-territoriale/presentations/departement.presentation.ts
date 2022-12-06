import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';

export type DepartementPresentation = {
  code: string;
  nom: string;
  zoom: number;
  lieuxCount?: number;
  localisation: Localisation;
};

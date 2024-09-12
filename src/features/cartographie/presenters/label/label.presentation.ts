import { DispositifProgrammeNational } from '@gouvfr-anct/lieux-de-mediation-numerique';

export type LabelPresentation = {
  ref: DispositifProgrammeNational;
  nom: string;
  description: string;
  url: string;
  carracteristiques: string[];
  lieuxCount?: number;
};

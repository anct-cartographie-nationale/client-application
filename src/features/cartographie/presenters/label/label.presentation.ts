import { LabelNational } from '@gouvfr-anct/lieux-de-mediation-numerique';

export type LabelPresentation = {
  ref: LabelNational;
  nom: string;
  description: string;
  url: string;
  carracteristiques: string[];
  lieuxCount?: number;
};

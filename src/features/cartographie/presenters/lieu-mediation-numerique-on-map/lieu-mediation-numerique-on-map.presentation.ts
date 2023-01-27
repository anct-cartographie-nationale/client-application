import { LabelNational } from '@gouvfr-anct/lieux-de-mediation-numerique';

export type LieuMediationNumeriqueOnMapPresentation = {
  id: string;
  nom: string;
  latitude: number;
  longitude: number;
  status?: string;
  labels_nationaux?: LabelNational[];
};

import { LabelNational } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { OpeningState } from '../../../core';

export type LieuMediationNumeriqueOnMapPresentation = {
  id: string;
  nom: string;
  latitude: number;
  longitude: number;
  status?: OpeningState;
  labels_nationaux?: LabelNational[];
};

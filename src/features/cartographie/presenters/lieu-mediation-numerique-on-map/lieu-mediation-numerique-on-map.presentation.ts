import { LabelNational } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { OpeningState } from '../../../core/presenters';

export type LieuMediationNumeriqueOnMapPresentation = {
  id: string;
  nom: string;
  latitude: number;
  longitude: number;
  status?: OpeningState;
  labels_nationaux?: LabelNational[];
  prise_rdv?: string;
};

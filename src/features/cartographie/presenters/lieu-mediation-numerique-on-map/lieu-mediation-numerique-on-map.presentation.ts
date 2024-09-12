import { DispositifProgrammeNational } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { OpeningState } from '../../../core/presenters';

export type LieuMediationNumeriqueOnMapPresentation = {
  id: string;
  nom: string;
  latitude: number;
  longitude: number;
  status?: OpeningState;
  dispositif_programmes_nationaux?: DispositifProgrammeNational[];
  prise_rdv?: string;
  prive?: boolean;
};

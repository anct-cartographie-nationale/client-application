import { LabelNational } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { OpeningState } from '../../../core/presenters';

export type LieuMediationNumeriqueListItemPresentationConditionsAccesLabel =
  | 'Gratuit'
  | 'Payant'
  | 'Gratuit sous condition'
  | 'Adhésion'
  | 'Pass Numérique';

export type LieuMediationNumeriqueListItemPresentationConditionsAcces = {
  label: LieuMediationNumeriqueListItemPresentationConditionsAccesLabel;
  isFree: boolean;
};

export type LieuMediationNumeriqueListItemPresentationLabelNational = LabelNational.CNFS | LabelNational.FranceServices;

export type LieuMediationNumeriqueListItemPresentation = {
  id: string;
  nom: string;
  adresse: string;
  date_maj: Date;
  courriel?: string;
  telephone?: string;
  site_web?: string;
  latitude: number;
  longitude: number;
  status?: OpeningState;
  conditions_acces?: LieuMediationNumeriqueListItemPresentationConditionsAcces;
  labels_nationaux?: LieuMediationNumeriqueListItemPresentationLabelNational[];
  distance?: number;
  prise_rdv?: string;
};

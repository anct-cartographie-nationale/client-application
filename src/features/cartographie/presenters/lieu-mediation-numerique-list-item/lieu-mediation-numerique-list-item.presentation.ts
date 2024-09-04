import { DispositifProgrammeNational } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { OpeningState } from '../../../core/presenters';

export type LieuMediationNumeriqueListItemPresentationConditionsAccesLabel =
  | 'Gratuit'
  | 'Payant'
  | 'Gratuit sous condition'
  | 'Adhésion'
  | 'Pass Numérique';

export type LieuMediationNumeriqueListItemPresentationFraisACharge = {
  label: LieuMediationNumeriqueListItemPresentationConditionsAccesLabel;
  isFree: boolean;
};

export type LieuMediationNumeriqueListItemPresentationDispositifProgrammesNationaux = DispositifProgrammeNational;

export type LieuMediationNumeriqueListItemPresentation = {
  id: string;
  nom: string;
  adresse: string;
  date_maj: Date;
  courriels?: string;
  telephone?: string;
  site_web?: string;
  latitude: number;
  longitude: number;
  status?: OpeningState;
  frais_a_charge?: LieuMediationNumeriqueListItemPresentationFraisACharge;
  dispositif_programmes_nationaux?: LieuMediationNumeriqueListItemPresentationDispositifProgrammesNationaux[];
  itinerance?: boolean;
  distance?: number;
  prise_rdv?: string;
  prive?: boolean;
};

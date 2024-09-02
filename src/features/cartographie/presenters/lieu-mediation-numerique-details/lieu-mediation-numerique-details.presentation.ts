import {
  Contact,
  DispositifProgrammeNational,
  Localisation,
  Presentation,
  PriseEnChargeSpecifique,
  PublicSpecifiquementAdresse,
  Service,
  Url
} from '@gouvfr-anct/lieux-de-mediation-numerique';
import { Aidant } from '../../../core/models';
import { HorairesPresentation, OpeningState } from '../../../core/presenters';

export type SourcePresentation = {
  label: string;
  link: string;
  detail?: string;
  update_link?: string;
  logo?: string;
};

export type LieuMediationNumeriqueDetailsPresentation = {
  id: string;
  nom: string;
  adresse: string;
  commune: string;
  code_postal: string;
  services?: Service[];
  horaires?: HorairesPresentation;
  full_horaires?: HorairesPresentation[];
  status?: OpeningState;
  typologies?: string;
  contact?: Contact;
  presentation?: Presentation;
  date_maj?: Date;
  publics_specifiquement_adresses?: PublicSpecifiquementAdresse[];
  prise_en_charge_specifique?: PriseEnChargeSpecifique[];
  frais_a_charge?: string;
  dispositif_programmes_nationaux?: DispositifProgrammeNational[];
  autres_formations_labels?: string[];
  modalites_accompagnement?: ModaliteAccompagnementPresentation[];
  fiche_acces_libre?: Url;
  localisation?: Localisation;
  distance?: number;
  prise_rdv?: string;
  aidants?: Aidant[];
  prive?: boolean;
  source?: SourcePresentation[];
};

export type ModaliteAccompagnementPresentation = { label: string; icon: string; description: string };

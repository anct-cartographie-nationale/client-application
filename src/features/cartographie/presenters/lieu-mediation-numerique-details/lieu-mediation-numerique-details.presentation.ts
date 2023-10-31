import {
  Contact,
  LabelNational,
  Localisation,
  Presentation,
  PublicAccueilli,
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
  services: Service[];
  horaires?: HorairesPresentation;
  full_horaires?: HorairesPresentation[];
  status?: OpeningState;
  typologies?: string;
  contact?: Contact;
  presentation?: Presentation;
  date_maj?: Date;
  publics_accueillis?: PublicAccueilli[];
  conditions_acces?: string;
  labels_nationaux?: LabelNational[];
  labels_autres?: string[];
  modalites_accompagnement?: ModaliteAccompagnementPresentation[];
  accessibilite?: Url;
  localisation?: Localisation;
  distance?: number;
  prise_rdv?: string;
  aidants?: Aidant[];
  prive?: boolean;
  source?: SourcePresentation;
};

export type ModaliteAccompagnementPresentation = { label: string; icon: string; description: string };

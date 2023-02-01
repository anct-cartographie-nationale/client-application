import {
  Contact,
  LabelNational,
  Localisation,
  Presentation,
  PublicAccueilli,
  Service,
  Url
} from '@gouvfr-anct/lieux-de-mediation-numerique';
import { Aidant, HorairesPresentation, OpeningState } from '../../../core';

export type LieuMediationNumeriqueDetailsPresentation = {
  id: string;
  nom: string;
  adresse: string;
  services: Service[];
  horaires?: HorairesPresentation;
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
  source?: string;
};

export type ModaliteAccompagnementPresentation = { label: string; icon: string; description: string };

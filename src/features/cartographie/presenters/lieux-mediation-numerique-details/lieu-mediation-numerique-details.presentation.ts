import {
  ConditionAcces,
  Contact,
  LabelNational,
  Localisation,
  ModaliteAccompagnement,
  Presentation,
  PublicAccueilli,
  Service,
  Url
} from '@gouvfr-anct/lieux-de-mediation-numerique';
import { Aidant, HorairesPresentation, OpeningStatus } from '../../../core';

export type LieuMediationNumeriqueDetailsPresentation = {
  id: string;
  nom: string;
  adresse: string;
  services: Service[];
  horaires?: HorairesPresentation;
  status?: OpeningStatus;
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
};

export type ModaliteAccompagnementPresentation = { label: string; icon: string; description: string };

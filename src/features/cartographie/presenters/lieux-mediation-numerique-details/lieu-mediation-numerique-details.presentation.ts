import {
  ConditionAccess,
  Contact,
  HorairesPresentation,
  LabelNational,
  Localisation,
  ModalitesAccompagnement,
  OpeningStatus,
  Presentation,
  PublicAccueilli,
  Service,
  Url
} from '../../../core';

export type LieuMediationNumeriqueDetailsPresentation = {
  id: string;
  nom: string;
  adresse: string;
  services: Service[];
  horaires?: HorairesPresentation;
  status?: OpeningStatus;
  typologie?: string;
  contact?: Contact;
  presentation?: Presentation;
  date_maj?: Date;
  publics_accueillis?: PublicAccueilli[];
  conditions_access?: ConditionAccess[];
  labels_nationaux?: LabelNational[];
  labels_autres?: string[];
  modalites_accompagnement?: ModalitesAccompagnement[];
  accessibilite?: Url;
  localisation?: Localisation;
  distance?: number;
};

import {
  ConditionAccess,
  Contact,
  LabelNational,
  ModalitesAccompagnement,
  Presentation,
  PublicAccueilli,
  Service,
  Url
} from 'projects/client-application/src/models';
import { HorairesPresentation } from '../horaires/horaires.presentation';
import { OpeningStatus } from '../horaires/horaires.presenter';

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
  distance?: number;
};

import { Adresse } from '../adresse/adresse';
import { Typologie } from '../typologie';
import { Localisation } from '../localisation/localisation';
import { Contact } from '../contact/contact';
import { Presentation } from '../presentation';
import { Service } from '../service';
import { PublicAccueilli } from '../publicAccueilli';
import { ConditionAccess } from '../condition-access';
import { ModalitesAccompagnement } from '../modalites-accompagnement';
import { Url } from '../url/url';
import { LabelNational } from '../labels-nationaux';
import { Pivot } from '../pivot/pivot';
import { CleBan } from '../cle-ban/cle-ban';

export interface LieuMediationNumerique {
  id: string;
  pivot?: Pivot;
  nom: string;
  adresse: Adresse;
  localisation: Localisation;
  cle_ban?: CleBan;
  typologie?: Typologie[];
  contact?: Contact;
  horaires?: string;
  presentation?: Presentation;
  source?: string;
  structure_parente?: string;
  date_maj?: Date;
  services: Service[];
  publics_accueillis?: PublicAccueilli[];
  conditions_access?: ConditionAccess[];
  labels_nationaux?: LabelNational[];
  labels_autres?: string[];
  modalites_accompagnement?: ModalitesAccompagnement[];
  accessibilite?: Url;
  prise_rdv?: Url;
}

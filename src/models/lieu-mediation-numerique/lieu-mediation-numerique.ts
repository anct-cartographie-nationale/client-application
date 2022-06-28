import { Adresse } from '../adresse/adresse';
import { Typologie } from '../typologie';
import { Localisation } from '../localisation/localisation';
import { Contact } from '../contact/contact';
import { Presentation } from '../presentation';
import { Siren } from '../siren/siren';
import { Siret } from '../siret/siret';
import { Service } from '../service';
import { Public } from '../public';
import { ModalitesAccess } from '../modalites-access';
import { TypeAccompagnement } from '../type-accompagnement';
import { Url } from '../url/url';
import { LabelNational } from '../labels-nationaux';

export interface LieuMediationNumerique {
  id: Siret;
  nom: string;
  adresse: Adresse;
  localisation: Localisation;
  typologie?: Typologie;
  contact?: Contact;
  horaires?: string;
  presentation?: Presentation;
  source?: string;
  structure_parente?: Siren;
  date_maj?: Date;
  services: Service[];
  publics?: Public[];
  modalites_access?: ModalitesAccess[];
  labels_nationaux?: LabelNational[];
  labels_autres?: string[];
  types_accompagnement?: TypeAccompagnement[];
  accessibilite?: Url;
  prise_rdv?: Url;
}

import { Service } from '../../../../../models/service';
import { ModalitesAccess } from '../../../../../models/modalites-access';
import { Public } from '../../../../../models/public';
import { TypeAccompagnement } from '../../../../../models/type-accompagnement';

export type FilterPresentation = {
  services?: Service;
  distance?: 5000 | 20000;
  accessibilite?: boolean;
  modalites_access?: ModalitesAccess[];
  publics?: Public[];
  types_accompagnement?: TypeAccompagnement[];
};

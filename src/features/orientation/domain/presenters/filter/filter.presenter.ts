import { Service } from '../../../../../models/service';

export type FilterPresentation = {
  services?: Service;
  distance?: 5000 | 20000;
  accessibilite?: boolean;
};

import { Localisation } from '../../../../models/localisation/localisation';

export interface Address {
  context: string;
  label: string;
  localisation: Localisation;
}

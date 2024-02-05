import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';

export type AddressType = 'housenumber' | 'street' | 'locality' | 'municipality';

export interface Address {
  id: string;
  context: string;
  label: string;
  localisation: Localisation;
  type: AddressType;
}

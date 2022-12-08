import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';

export interface Address {
  context: string;
  label: string;
  localisation: Localisation;
}

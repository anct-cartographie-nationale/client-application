import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';

export interface ResultFoundPresentation<T = {}> {
  context: string;
  label: string;
  localisation: Localisation;
  payload?: T;
}

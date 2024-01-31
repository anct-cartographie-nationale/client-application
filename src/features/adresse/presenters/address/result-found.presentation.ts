import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { WithType } from '../../configuration';

export interface ResultFoundPresentation<T extends WithType = WithType> {
  id: string;
  context: string;
  label: string;
  localisation: Localisation;
  payload: T;
}

import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';

type NoLocalisation = null & { noLocalisation: true };

export const NO_LOCALISATION: Localisation = null as NoLocalisation;

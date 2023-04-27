import { Service } from '@gouvfr-anct/lieux-de-mediation-numerique';

export type OrientationInformationTypes = Service | 'apprentissage' | 'démarches' | 'culture-numérique' | 'matériel';

export type OrientationInformationContent = {
  titre: string;
  description: string;
  elements: string[];
  label: string;
};

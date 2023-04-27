import { Service } from '@gouvfr-anct/lieux-de-mediation-numerique';

export type BesoinOrientationInformationTypes = Service | 'apprentissage' | 'démarches' | 'culture-numérique' | 'matériel';

export type AccessibiliteOrientationInformationTypes = 'participation' | 'accueil-specifique';

export type OrientationInformationContent = {
  titre: string;
  description: string;
  elements?: string[];
  label?: string;
};

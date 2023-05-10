import {
  OrientationInformationContent,
  BesoinOrientationInformationTypes,
  AccessibiliteOrientationInformationTypes
} from '../../presenters';

export const ACCESSIBILITE_INFORMATION_MODAL_TEXTS: Record<
  AccessibiliteOrientationInformationTypes,
  OrientationInformationContent
> = {
  participation: {
    titre: 'Participation',
    description:
      "La participation est le tarif pouvant conditionner l'accès à une structure ou un service de médiation numérique. Si vous sélectionnez certaines de ces options, vous restreindrez votre recherche aux structures demandant ces participations",
    elements: [
      'Gratuit : Accès gratuit au lieu et à ses services',
      'Gratuit sous condition : situation familiale, convention avec un organisme social, etc.',
      'Payant : L’accès au lieu et/ou à ses services est payant',
      'Adhésion : L’accès au lieu et/ou à ses services nécessite d’y adhérer',
      'Pass numérique : Il est possible d’utiliser un Pass numérique pour accéder au lieu'
    ],
    label: 'Détails des différentes options'
  },
  'accueil-specifique': {
    titre: 'Accueil adapté',
    description: `Si vous sélectionnez certaines de ces options, vous restreindrez votre recherche aux structures en capacité d'accueillir certains types de publics. Pour toute information concernant les déplacements des personnes en situation de handicap, rendez-vous sur <a href="https://acceslibre.beta.gouv.fr/" target="_blank" rel="noopener noreferrer">Accès libre</a>`,
    elements: [
      'Handicaps psychique : troubles psychiatriques donnant lieu à des atteintes comportementales',
      'Handicaps mental : déficiences limitant les activités d’une personne'
    ],
    label: 'Détails de certaines options'
  }
};

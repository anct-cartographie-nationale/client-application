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
      "La participation est le tarif pouvant conditionner l'accès à une structure ou un service de médiation numérique. Les usagers doivent, dans certains cas, s'acquitter d'une participation pour bénéficier d'un service ou d'un accompagnement. Si vous sélectionnez certaines de ces options, vous restreindrez votre recherche aux structures demandant ces participations.",
    elements: [
      'Gratuit : Accès gratuit au lieu et à ses services',
      'Gratuit sous condition : La gratuité est conditionnée à certains critères (situation familiale, convention avec un organisme social…)',
      'Payant : L’accès au lieu et/ou à ses services est payant',
      'Adhésion : L’accès au lieu et/ou à ses services nécessite d’y adhérer',
      'Pass numérique : Il est possible d’utiliser un Pass numérique pour accéder au lieu'
    ],
    label: 'Détails des différentes options'
  },
  'accueil-specifique': {
    titre: 'Accueil adapté',
    description:
      "Si vous sélectionnez certaines de ces options, vous restreindrez votre recherche aux structures en capacité d'accueillir certains types de publics. Pour toute information concernant les déplacements des personnes en situation de handicap, rendez-vous sur https://acceslibre.beta.gouv.fr/.",
    elements: [
      'Handicaps psychiques : troubles psychiatriques donnant lieu à des atteintes comportementales',
      'Handicaps mentaux : déficiences limitant les activités d’une personne',
      'Critères d’accessibilité remplis sur Accèslibre',
      'Personne en situation d’illétrisme',
      'Non-Francophone',
      'Déficience visuelle',
      'Surdité'
    ],
    label: 'Détails de certaines options'
  }
};

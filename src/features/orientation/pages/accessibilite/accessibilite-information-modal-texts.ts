import { AccessibiliteOrientationInformationTypes, OrientationInformationContent } from '../../presenters';

export const ACCESSIBILITE_INFORMATION_MODAL_TEXTS: Record<
  AccessibiliteOrientationInformationTypes,
  OrientationInformationContent
> = {
  'accueil-specifique': {
    titre: 'Accueil adapté',
    description: `Si vous sélectionnez certaines de ces options, vous restreindrez votre recherche aux lieux en capacité d'accueillir certains types de publics. Pour toute information concernant les déplacements des personnes en situation de handicap, rendez-vous sur <a href="https://acceslibre.beta.gouv.fr/" target="_blank" title="Accès libre (nouvel onglet)" rel="noopener noreferrer">Accès libre</a>`,
    elements: [
      'Handicap psychique : trouble psychiatrique donnant lieu à des atteintes comportementales',
      'Handicap mental : déficience limitant les activités d’une personne'
    ],
    label: 'Détails de certaines options'
  }
};

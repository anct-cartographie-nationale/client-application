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
      'La participation est la tarifaction qui peut être demandé au bénéficiaire. Si vous cochez une participation vous restreindrez votre recherche à des modes de participation spécifiques',
    elements: ['Gratuit', 'Payant', 'Adhésion, ou gratuit sous conditions spécifiques', 'Accepte le Pass Numérique'],
    label: 'Liste des profils'
  },
  'accueil-specifique': {
    titre: 'Accueil adapté',
    description:
      'Si vous cochez certains de ces mots, vous restreindrez votre recherche a des structures adaptées à certaines pathologie. Pour tout besoin spécifique, on peut accéder aux critères d’accessibilité précis des structures ayant rempli leurs informations sur “accèslibre”',
    elements: [
      'Handicaps psychiques : troubles psychiatriques donnant lieu à des atteintes comportementales',
      'Handicaps mentaux : déficiences limitant les activités d’une personne',
      'Critères d’accessibilité remplis sur Accèslibre',
      'Personne en situation d’illétrisme',
      'Non-Francophone',
      'Déficience visuelle',
      'Surdité'
    ],
    label: 'Liste des profils'
  }
};

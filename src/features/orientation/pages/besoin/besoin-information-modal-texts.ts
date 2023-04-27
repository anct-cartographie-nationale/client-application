import { Service } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { OrientationInformationContent, OrientationInformationTypes } from '../../presenters';

export const BESOIN_INFORMATION_MODAL_TEXTS: Record<OrientationInformationTypes, OrientationInformationContent> = {
  apprentissage: {
    titre: 'Apprentissages de base',
    description:
      "Les apprentissages de bases se passent souvent sous la forme d'ateliers pour un public ne sachant pas se servir de leur materiel numérique",
    elements: [
      'Prendre en main un smartphone ou une tablette',
      'Prendre en main un ordinateur',
      'Utiliser le numérique au quotidien'
    ],
    label: 'Liste des apprentissages de base'
  },
  [Service.PrendreEnMainUnSmartphoneOuUneTablette]: {
    titre: 'Prendre en main un smartphone ou une tablette',
    description:
      "Vous ne savez pas vous servir de votre smartphone ou votre tablette ? Vous venez de l'acheter ? Certaines structures vous accompagne dans la prise en main de vos outils",
    elements: [
      "Apprendre à me servir d'un écran tactile",
      'Utiliser mon smartphone pour la première fois',
      'Configurer mon smartphone',
      'Connaître les outils de base présents sur mon smartphone'
    ],
    label: 'Exemples non exhaustifs'
  },
  [Service.PrendreEnMainUnOrdinateur]: {
    titre: 'Prendre en main un ordinateur',
    description:
      "Vous ne savez pas vous servir de votre ordinateur ? Vous venez de l'acheter ? Certaines structures vous accompagne dans la prise en main de vos outils",
    elements: [
      "Apprendre à me servir d'un clavier et d'une souris",
      'Utiliser mon ordinateur pour la première fois',
      'Configurer mon ordinateur',
      'Connaître les outils de base présents sur mon ordinateur'
    ],
    label: 'Exemples non exhaustifs'
  },
  [Service.UtiliserLeNumerique]: {
    titre: 'Utiliser le numérique au quotidien',
    description:
      "Vous disposez d'outil informatique mais vous n'avez pas le réflexe et ne savez pas vraiment comment celui ci peut répondre à mes besoins",
    elements: [
      'Apprendre a utiliser la suite office',
      'Utiliser les outils google',
      'Utiliser un tableur',
      "Les outils open sources pouvant m'aider au jour le jour"
    ],
    label: 'Exemples non exhaustifs'
  },
  démarches: {
    titre: 'Démarches',
    description:
      "L'aide aux démarches va permettre aux bénéficiaires d'être accompagné dans la réalisation des démarches du quotidien",
    elements: [
      'Être aidé ponctuellement pour réaliser une démarche en ligne',
      'Être formé aux démarches administratives en ligne',
      'Créer et développer mon entreprise',
      'Être accompagné dans mes démarches de santé',
      'Favoriser mon insertion professionnelle'
    ],
    label: 'Liste des apprentissages de base'
  },
  [Service.RealiserDesDemarchesAdministratives]: {
    titre: 'Être aidé ponctuellement pour réaliser une démarche en ligne',
    description: 'Des spécialistes sont disponibles pour vous aider, voir faire à votre place certaines démarches en ligne',
    elements: ['CAF', 'CPAM', 'Pole emploi', 'Impôts', 'Juridique'],
    label: 'Exemples non exhaustifs'
  },
  [Service.DevenirAutonomeDansLesDemarchesAdministratives]: {
    titre: 'Être formé aux démarches administratives en ligne',
    description:
      "Certaines structures proposent des ateliers permettant aux bénéficiaire d'apprendre à remplir eux même des démarches en ligne",
    elements: ['CAF', 'CPAM', 'Pole emploi', 'Impôts', 'Juridique'],
    label: 'Exemples non exhaustifs'
  },
  [Service.CreerEtDevelopperMonEntreprise]: {
    titre: 'Créer et développer mon entreprise',
    description: "Certaines structures proposent de l'aide pour aider dans les démarches d'entreprise",
    elements: [
      'Créer mon auto-entreprise',
      'Connaître les sites internet permettant de gérer mon entreprise',
      'Fermer mon entreprise'
    ],
    label: 'Exemples non exhaustifs'
  },
  [Service.AccompagnerLesDemarchesDeSante]: {
    titre: 'Être accompagné dans mes démarches de santé',
    description:
      'Vos démarches de santé son nombreuses, vous pouvez trouver des structures adaptées pour vous accompagner dans celles-ci',
    elements: ['Utiliser améli.fr', 'Trouver un médecin traitant', 'Apprendre à utiliser Qare ou Doctolib'],
    label: 'Exemples non exhaustifs'
  },
  [Service.FavoriserMonInsertionProfessionnelle]: {
    titre: 'Favoriser mon insertion professionnelle',
    description:
      'Pour vous accompagner pour toute démarches favorisant votre insertion professionnelle, des aidants sont la pour vous épauler',
    elements: [
      'Utiliser le site de pole emploi',
      'Comment faire un CV',
      "Utiliser les outils de recherche d'emploi",
      'Utiliser Linkedin'
    ],
    label: 'Exemples non exhaustifs'
  },
  'culture-numérique': {
    titre: 'Culture numérique',
    description:
      "Souvent pour des utilisateurs sachant déjà se servir de leurs outils, l'approfondissement de la culture numérique permettra d'en savoir plus sur des utilisations précises de l'outil informatique",
    elements: [
      'Approfondir ma culture numérique',
      'Promouvoir la citoyenneté numérique',
      'Créer avec le numérique',
      "Soutenir la parentalité et l'éducation avec le numérique"
    ],
    label: 'Liste des apprentissages de base'
  },
  [Service.ApprofondirMaCultureNumerique]: {
    titre: 'Approfondir ma culture numérique',
    description:
      'Pour des apprentissages précis certaines structures propose des ateliers et des apprentissages sur des sujets avancés',
    elements: ['Utiliser mon matériel de manière sécurisée', 'Repérer les fake news', 'Comment gérer mes données'],
    label: 'Exemples non exhaustifs'
  },
  [Service.PromouvoirLaCitoyenneteNumerique]: {
    titre: 'Promouvoir la citoyenneté numérique',
    description:
      'Certaines structures aident les bénéficiaire à utiliser leurs outils numérique de manière saine, responsable et non-dangereuse',
    elements: ['Les droits et les interdits sur internet', 'Naviguer de manière responsable', 'Les comportements a risque'],
    label: 'Exemples non exhaustifs'
  },
  [Service.CreerAvecLeNumerique]: {
    titre: 'Créer avec le numérique',
    description:
      'Des structures peuvent vous aider sur vos projet numérique, et vous donner accès à des outils de création spécifique',
    elements: ['Faire de la retouche photo', 'Faire du montage vidéo', 'Fablabs et imprimantes 3D'],
    label: 'Exemples non exhaustifs'
  },
  [Service.SoutenirLaParentalite]: {
    titre: "Soutenir la parentalité et l'éducation numérique",
    description:
      'Les parents qui se questionnant sur les démarches et usages numériques de leurs enfants peuvent consulter un médiateurs spécialisé sur ces sujets',
    elements: ['Les dangers pour mon enfant', 'Le harcèlement sur les réseaux sociaux', 'ParcourSup'],
    label: 'Exemples non exhaustifs'
  },
  matériel: {
    titre: 'Manque de matériel',
    description:
      "Certaines structures vont vous permettre d'accéder simplement à du matériel, voir d'en louer ou d'en acheter à des tarifs solidaire",
    elements: [
      'Accéder à une connexion internet',
      'Accéder à du matériel numérique en libre service',
      'Acheter du matériel numérique à tarif solidaire'
    ],
    label: 'Liste des apprentissages de base'
  },
  [Service.AccederAUneConnexionInternet]: {
    titre: 'Accéder à une connexion internet',
    description:
      "Vous avez besoin d'utiliser internet mais n'y avez pas accès, certaines structures peuvent vous aider avec ou sans conditions",
    elements: [
      'Accéder à du wifi en libre service',
      'Accéder à du wifi pour mes démarches administratives',
      'Obtenir une clé 4G'
    ],
    label: 'Exemples non exhaustifs'
  },
  [Service.AccederADuMateriel]: {
    titre: 'Accéder à du matériel en libre service',
    description:
      "Vous avez un besoin matériel ? Certaines structures vous proposent d'accéder gratuitement ou sous condition à des outils pour vous aider",
    elements: ['Imprimer', 'Accéder à un ordinateur'],
    label: 'Exemples non exhaustifs'
  },
  [Service.EquiperEnMaterielInformatique]: {
    titre: 'Acheter du matériel numérique à tarif solidaire',
    description:
      "Vous avez un besoin matériel ? Certaines structures vous proposent d'acheter du matériel a des gratuitement ou a tarifs réduits",
    elements: ['Don de matériel', 'Louer/se faire prêter', 'Acheter à tarif solidaire'],
    label: 'Exemples non exhaustifs'
  }
};

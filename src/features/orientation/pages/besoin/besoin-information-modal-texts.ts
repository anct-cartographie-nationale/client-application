import { Service } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { OrientationInformationContent, BesoinOrientationInformationTypes } from '../../presenters';

export const BESOIN_INFORMATION_MODAL_TEXTS: Record<BesoinOrientationInformationTypes, OrientationInformationContent> = {
  apprentissage: {
    titre: 'Apprentissages de base',
    description:
      "Les apprentissages de bases sont souvent dispensés / proposés sous formes d'ateliers collectifs et destinés aux personnes souhaitant s'initier à l'utilisation d'un appareil numérique.",
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
      'Un accompagnement collectif ou individuel pour initier les usagers à la prise en main de smartphones ou de tablettes.',
    elements: [
      "Apprendre à me servir d'un écran tactile",
      'Utiliser mon smartphone pour la première fois',
      'Configurer mon smartphone',
      'Connaître les outils de base présents sur mon smartphone'
    ],
    label: 'Exemples'
  },
  [Service.PrendreEnMainUnOrdinateur]: {
    titre: 'Prendre en main un ordinateur',
    description:
      "Un accompagnement collectif ou individuel pour initier les usagers à la prise en main d'un ordinateur fixe ou portable.",
    elements: [
      "Apprendre à me servir d'un clavier et d'une souris",
      'Utiliser mon ordinateur pour la première fois',
      'Configurer mon ordinateur',
      'Connaître les outils de base présents sur mon ordinateur'
    ],
    label: 'Exemples'
  },
  [Service.UtiliserLeNumerique]: {
    titre: 'Utiliser le numérique au quotidien',
    description:
      'Faire découvrir aux usagers les fonctionnalités propres aux appareils numériques et les opportunités de la navigation web.',
    elements: [
      'Utiliser des périphériques',
      'Utiliser les outils de Google',
      'Utiliser un tableur, un traitement de texte, etc.'
    ],
    label: 'Exemples'
  },
  démarches: {
    titre: 'Aide aux démarches',
    description:
      'Un accompagnement individuel pour aider les usagers à  réaliser leurs démarches du quotidien (administratives, juridiques, sociales, scolaires, etc.)',
    elements: [
      'Être aidé(e) ponctuellement pour réaliser mes démarches en ligne',
      'Être formé(e) pour réaliser mes démarches en ligne',
      'Créer et développer son entreprise',
      'Etre aidé(e) dans ses démarches de santé',
      'Favoriser son insertion professionnelle'
    ],
    label: 'Liste des apprentissages de base'
  },
  [Service.RealiserDesDemarchesAdministratives]: {
    titre: 'Être aidé(e) ponctuellement pour réaliser mes démarches en ligne',
    description:
      'Pour certaines démarches, des professionnels sont disponibles pour aider les usagers à réaliser certaines démarches en ligne, voire à les faire à leur place.',
    elements: ['CAF', 'CPAM', 'Pôle emploi', 'Impôts', 'Juridique'],
    label: 'Exemples'
  },
  [Service.DevenirAutonomeDansLesDemarchesAdministratives]: {
    titre: 'Être formé(e) pour réaliser mes démarches en ligne',
    description:
      'Certaines structures proposent des ateliers permettant aux usagers d’apprendre à réaliser des démarches administratives en ligne en toute autonomie.',
    elements: ['CAF', 'CPAM', 'Pole emploi', 'Impôts', 'Juridique'],
    label: 'Exemples'
  },
  [Service.CreerEtDevelopperMonEntreprise]: {
    titre: 'Créer et développer son entreprise',
    description:
      "Certaines structures spécialisées pour accompagner les usagers dans leurs démarches de création d'entreprise.",
    elements: [
      'Créer mon auto-entreprise',
      'Connaître les sites internet permettant de gérer mon entreprise',
      'Fermer mon entreprise'
    ],
    label: 'Exemples'
  },
  [Service.AccompagnerLesDemarchesDeSante]: {
    titre: 'Etre aidé(e) dans ses démarches de santé',
    description:
      'Vos démarches de santé son nombreuses, vous pouvez trouver certaines structures adaptées pour vous accompagner dans celles-ci.',
    elements: [
      'Utiliser ameli.fr',
      'Trouver un médecin traitant',
      'Trouver un rendez-vous chez une spécialiste',
      'Apprendre à utiliser Doctolib ou Qare',
      'Dossier Affection de longue durée',
      'Arrêt maladie - accident de travail - RQTH'
    ],
    label: 'Exemples'
  },
  [Service.FavoriserMonInsertionProfessionnelle]: {
    titre: 'Favoriser son insertion professionnelle',
    description:
      "Des aidants professionnels disponibles pour accompagner les usagers dans leur parcours d'insertion professionnelle.",
    elements: [
      'Utiliser le site de Pôle emploi',
      'Comment faire un CV ?',
      "Utiliser les outils de recherche d'emploi",
      'Utiliser Linkedin',
      'Postuler en ligne',
      'Formation et reconversion professionnelle',
      'CPF : gérer son compte et trouver sa formation'
    ],
    label: 'Exemples'
  },
  'culture-numérique': {
    titre: 'Culture numérique',
    description:
      'Permettre aux utilisateurs confirmés d’approfondir leur culture numérique ou de maîtriser des techniques numériques spécifiques.',
    elements: [
      'Approfondir sa culture numérique',
      'Promouvoir la citoyenneté numérique',
      'Créer avec le numérique',
      "Soutenir la parentalité et l'éducation avec le numérique"
    ],
    label: 'Liste des apprentissages de base'
  },
  [Service.ApprofondirMaCultureNumerique]: {
    titre: 'Approfondir sa culture numérique',
    description:
      'Certaines structures proposent des ateliers de perfectionnement ou des formations avancées sur des thématiques spécifiques.',
    elements: [
      'Utiliser mon matériel de manière sécurisée',
      'Repérer les fake news',
      'Comment gérer mes données',
      'Comprendre et gérer ses réseaux sociaux'
    ],
    label: 'Exemples'
  },
  [Service.PromouvoirLaCitoyenneteNumerique]: {
    titre: 'Promouvoir la citoyenneté numérique',
    description:
      'Certaines structures aident les usagers à utiliser leurs outils numériques de manière saine, responsable et sécurisée.',
    elements: ['Les droits et les interdits sur internet', 'Naviguer de manière responsable', 'Les comportements à risque'],
    label: 'Exemples'
  },
  [Service.CreerAvecLeNumerique]: {
    titre: 'Créer avec le numérique',
    description:
      'Certaines structures accompagnent les usagers à la réalisation de leurs projets numériques et leurs donnent accès à des outils de création spécifiques.',
    elements: [
      'Créer un site vitrine ou marchand',
      'Faire de la retouche photo',
      'Faire du montage vidéo',
      'Fablabs et imprimantes 3D'
    ],
    label: 'Exemples'
  },
  [Service.SoutenirLaParentalite]: {
    titre: "Soutenir la parentalité et l'éducation numérique",
    description:
      'Certaines structures conseillent les parents et leurs enfants sur les outils et techniques pour utiliser le numérique en toute sécurité.',
    elements: [
      'Les dangers pour mon enfant',
      'Le harcèlement sur les réseaux sociaux',
      'ParcourSup',
      'Jeux en ligne : jeux vidéo, paris sportifs, etc.',
      'Sites et logiciels éducatifs'
    ],
    label: 'Exemples'
  },
  matériel: {
    titre: 'Équipement numérique',
    description: "Certaines structures proposent du matériel en accès libre, en location ou à l'achat à des tarifs solidaires.",
    elements: [
      'Accéder à une connexion internet',
      'Accéder à du matériel numérique en libre service',
      'Acheter du matériel numérique à tarif solidaire'
    ],
    label: 'Liste des apprentissages de base'
  },
  [Service.AccederAUneConnexionInternet]: {
    titre: 'Accéder à une connexion internet',
    description: "Certaines structures proposent gratuitement ou sous conditions l'accès à une connexion internet.",
    elements: [
      'Accéder à du wifi en libre service',
      'Accéder à du wifi pour mes démarches administratives',
      'Obtenir une clé 4G'
    ],
    label: 'Exemples'
  },
  [Service.AccederADuMateriel]: {
    titre: 'Accéder à du matériel en libre service',
    description:
      "Certaines structures proposent gratuitement ou sous conditions l'accès à du matériel numérique en libre service.",
    elements: ['Imprimer gratuitement ou à bas prix', 'Accéder à un ordinateur'],
    label: 'Exemples'
  },
  [Service.EquiperEnMaterielInformatique]: {
    titre: 'Acheter ou louer du matériel à tarif solidaire',
    description: "Certaines structures proposent en location ou à l'achat du matériel  à tarif solidaire.",
    elements: [
      'Don de matériel',
      'Louer/se faire prêter',
      'Acheter ou louer à bas prix',
      'Avoir un ordinateur, une connexion internet ou encore une imprimante à la maison'
    ],
    label: 'Exemples'
  }
};

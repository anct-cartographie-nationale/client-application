import { Service } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { OrientationInformationContent, BesoinOrientationInformationTypes } from '../../presenters';

export const BESOIN_INFORMATION_MODAL_TEXTS: Record<BesoinOrientationInformationTypes, OrientationInformationContent> = {
  apprentissage: {
    titre: 'Apprentissages de base',
    description:
      "Les apprentissages de bases sont souvent dispensés / proposés sous formes d'ateliers collectifs et destinés aux personnes souhaitant s'initier à l'utilisation d'un appareil numérique.",
    elements: [
      "Apprendre à me servir d'un clavier et d'une souris",
      'Utiliser mon ordinateur pour la première fois',
      'Prendre en main un smartphone ou une tablette',
      'Prendre en main un ordinateur',
      'Utiliser le numérique au quotidien'
    ],
    label: 'Liste des apprentissages de base'
  },
  [Service.MaitriseDesOutilsNumeriquesDuQuotidien]: {
    titre: 'Maitrise des outils numériques du quotidien',
    description:
      'Faire découvrir aux usagers les fonctionnalités propres aux appareils numériques et les opportunités de la navigation web.',
    elements: [
      "Apprendre à me servir d'un clavier et d'une souris",
      'Utiliser mon ordinateur pour la première fois',
      'Prendre en main un smartphone ou une tablette',
      'Prendre en main un ordinateur',
      'Utiliser le numérique au quotidien',
      'Utiliser des services sur internet',
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
  [Service.AideAuxDemarchesAdministratives]: {
    titre: 'Être aidé(e) ponctuellement pour réaliser mes démarches en ligne',
    description:
      'Pour certaines démarches, des professionnels sont disponibles pour aider les usagers à réaliser certaines démarches en ligne, voire à les faire à leur place.',
    elements: ['CAF', 'CPAM', 'Pôle emploi', 'Impôts', 'Juridique'],
    label: 'Exemples'
  },
  [Service.InsertionProfessionnelleViaLeNumerique]: {
    titre: 'Insertion professionnelle via le numérique',
    description:
      "Des aidants professionnels disponibles pour accompagner les usagers dans leur parcours d'insertion professionnelle.",
    elements: [
      'Utiliser le site de Pôle emploi',
      'Comment faire un CV ?',
      "Utiliser les outils de recherche d'emploi",
      'Utiliser Linkedin',
      'Postuler en ligne',
      'Formation et reconversion professionnelle',
      'CPF : gérer son compte et trouver sa formation',
      'Créer mon auto-entreprise',
      'Connaître les sites internet permettant de gérer mon entreprise',
      'Fermer mon entreprise'
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
  [Service.ComprehensionDuMondeNumerique]: {
    titre: 'Comprehension du monde numérique',
    description:
      'Certains lieux proposent des ateliers de perfectionnement ou des formations avancées sur des thématiques spécifiques.',
    elements: [
      'Comment gérer mes données',
      'Comprendre et gérer ses réseaux sociaux',
      "Comprendre le fonctionnement d'Internet et du Web",
      'Introduction aux technologies émergentes (IA, blockchain, etc.)',
      'Découvrir les outils de collaboration en ligne (Google Drive, Microsoft Teams, etc.)',
      'Introduction aux algorithmes et à leur impact sur la société',
      'Naviguer dans le monde des applications mobiles et de leurs autorisations',
      'Décrypter le langage des nouvelles technologies'
    ],
    label: 'Exemples'
  },
  [Service.UtilisationSecuriseeDuNumerique]: {
    titre: 'Utilisation sécurisée du numérique',
    description:
      'Certains lieux aident les usagers à utiliser leurs outils numériques de manière saine, responsable et sécurisée.',
    elements: [
      'Créer et gérer des mots de passe sécurisés',
      'Reconnaître et éviter les tentatives de phishing',
      'Mettre à jour et sécuriser ses logiciels et appareils',
      'Comprendre les réglages de confidentialité sur les réseaux sociaux',
      'Protéger ses données personnelles en ligne',
      'Connaître les bonnes pratiques pour les paiements en ligne',
      'Éviter les escroqueries et fraudes en ligne'
    ],
    label: 'Exemples'
  },
  [Service.LoisirsEtCreationsNumeriques]: {
    titre: 'Loisirs et créations numériques',
    description:
      'Certains lieux proposent des activités pour découvrir et s’initier à des pratiques numériques créatives et récréatives.',
    elements: [
      'Découvrir les bases de la retouche photo et du montage vidéo',
      'S’initier au codage et à la programmation avec des ateliers ludiques',
      'Apprendre à utiliser des logiciels de musique numérique',
      'Créer des animations ou des dessins numériques',
      'Découvrir la modélisation 3D et l’impression 3D',
      'Apprendre à créer des podcasts ou des vidéos YouTube',
      'S’initier aux bases de la photographie numérique et à l’utilisation des appareils photo numériques'
    ],
    label: 'Exemples'
  },
  [Service.ParentaliteEtEducationAvecLeNumerique]: {
    titre: "Soutenir la parentalité et l'éducation numérique",
    description:
      'Certains lieux conseillent les parents et leurs enfants sur les outils et techniques pour utiliser le numérique en toute sécurité.',
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
    description: "Certains lieux proposent du matériel en accès libre, en location ou à l'achat à des tarifs solidaires.",
    elements: [
      'Accéder à une connexion internet',
      'Accéder à du matériel numérique en libre service',
      'Acheter du matériel numérique à tarif solidaire'
    ],
    label: 'Liste des apprentissages de base'
  },
  [Service.AccesInternetEtMaterielInformatique]: {
    titre: 'Accéder à une connexion internet et à du matériel en libre service',
    description:
      "Certains lieux proposent gratuitement ou sous conditions l'accès à une connexion internet ou l'accès à du matériel numérique en libre service.",
    elements: [
      'Accéder à du wifi en libre service',
      'Accéder à du wifi pour mes démarches administratives',
      'Imprimer gratuitement ou à bas prix',
      'Accéder à un ordinateur',
      'Accéder à une tablette'
    ],
    label: 'Exemples'
  },
  [Service.MaterielInformatiqueAPrixSolidaire]: {
    titre: 'Acheter ou louer du matériel informatique à tarif solidaire',
    description: "Certains lieux proposent en location ou à l'achat du matériel à tarif solidaire.",
    elements: [
      'Don de matériel',
      'Louer/se faire prêter',
      'Acheter ou louer à bas prix',
      'Avoir un ordinateur, une imprimante à la maison, etc.',
      'Obtenir une clé 4G'
    ],
    label: 'Exemples'
  }
};

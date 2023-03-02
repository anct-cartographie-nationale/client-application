import {
  ConditionAcces,
  LabelNational,
  ModaliteAccompagnement,
  PublicAccueilli,
  Service
} from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LabelPresentation } from './label.presentation';

export const labelToDisplayMap: Map<LabelNational, LabelPresentation> = new Map<LabelNational, LabelPresentation>([
  [
    LabelNational.CNFS,
    {
      ref: LabelNational.CNFS,
      nom: 'Conseiller numérique France Services',
      description:
        'Un Conseiller numérique France Services a pour mission d’accompagner les Français dans leur appropriation des usages numériques quotidiens',
      url: 'https://www.conseiller-numerique.gouv.fr/',
      carracteristiques: [
        Service.RealiserDesDemarchesAdministratives,
        Service.AccompagnerLesDemarchesDeSante,
        Service.FavoriserMonInsertionProfessionnelle,
        Service.DevenirAutonomeDansLesDemarchesAdministratives,
        Service.PrendreEnMainUnOrdinateur,
        Service.SoutenirLaParentalite,
        Service.UtiliserLeNumerique
      ]
    }
  ],
  [
    LabelNational.AidantsConnect,
    {
      ref: LabelNational.AidantsConnect,
      nom: 'Aidants Connect',
      description:
        "Aidants Connect permet à des professionnels de réaliser des démarches administratives à la place d'un usager de façon sécurisée.",
      url: 'https://aidantsconnect.beta.gouv.fr/',
      carracteristiques: [
        Service.RealiserDesDemarchesAdministratives,
        Service.AccompagnerLesDemarchesDeSante,
        Service.CreerEtDevelopperMonEntreprise,
        ModaliteAccompagnement.AMaPlace
      ]
    }
  ],
  [
    LabelNational.APTIC,
    {
      ref: LabelNational.APTIC,
      nom: 'APTIC',
      description:
        '#APTIC c’est le pass qui rapproche le citoyen du numérique. Conçu sur le modèle des titres-restaurant, il permet de payer totalement ou partiellement des services de médiation numérique.',
      url: 'https://www.aptic.fr/',
      carracteristiques: [ConditionAcces.AccepteLePassNumerique]
    }
  ],
  [
    LabelNational.CampusConnecte,
    {
      ref: LabelNational.CampusConnecte,
      nom: 'Campus Connecté',
      description:
        "Les campus connectés sont des lieux d'études où les jeunes peuvent suivre, près de chez eux, des formations à distance dans l'enseignement supérieur en bénéficiant d'un tutorat individuel et collectif. Des diplômes de qualité sont proposés à distance par les établissements d'enseignement supérieur.",
      url: 'https://www.enseignementsup-recherche.gouv.fr/fr/campus-connectes',
      carracteristiques: [
        Service.FavoriserMonInsertionProfessionnelle,
        ModaliteAccompagnement.DansUnAtelier,
        PublicAccueilli.Jeunes
      ]
    }
  ],
  [
    LabelNational.FabriquesDeTerritoire,
    {
      ref: LabelNational.FabriquesDeTerritoire,
      nom: 'Fabrique de territoire',
      description:
        'Un tiers-lieu Fabrique de territoire participe à l’émergence d’autres tiers-lieux de moindre envergure et accompagne la montée en compétences numérique sur son territoire.',
      url: 'https://agence-cohesion-territoires.gouv.fr/fabriques-de-territoire-582',
      carracteristiques: ['Tiers-lieux et coworking']
    }
  ],
  [
    LabelNational.FranceServices,
    {
      ref: LabelNational.FranceServices,
      nom: 'France Services',
      description:
        'Une maison France services est une structure qui combine accueil physique et accompagnement numérique, et qui regroupe en un même lieu plusieurs services.',
      url: 'https://www.economie.gouv.fr/particuliers/france-services',
      carracteristiques: [
        Service.RealiserDesDemarchesAdministratives,
        Service.AccompagnerLesDemarchesDeSante,
        Service.FavoriserMonInsertionProfessionnelle,
        Service.DevenirAutonomeDansLesDemarchesAdministratives
      ]
    }
  ],
  [
    LabelNational.FrenchTech,
    {
      ref: LabelNational.FrenchTech,
      nom: 'La French Tech',
      description:
        "La French Tech à pour mission de faire de la France l'un des pays les plus attractifs au monde pour les start-up qui veulent se lancer, partir à la conquête des marchés internationaux et bâtir un avenir qui ait du sens.",
      url: 'https://lafrenchtech.com',
      carracteristiques: [Service.CreerEtDevelopperMonEntreprise]
    }
  ],
  [
    LabelNational.GrandesEcolesDuNumerique,
    {
      ref: LabelNational.GrandesEcolesDuNumerique,
      nom: 'Grandes écoles du numérique',
      description:
        "les Grandes écoles du numérique visent à apporter une réponse aux besoins en compétences dans les métiers du numérique et à favoriser la formation et l'insertion sociale et professionnelle des personnes éloignées de l'emploi.",
      url: 'https://www.grandeecolenumerique.fr/',
      carracteristiques: [Service.FavoriserMonInsertionProfessionnelle, Service.CreerAvecLeNumerique]
    }
  ],
  [
    LabelNational.PointNumeriqueCAF,
    {
      ref: LabelNational.PointNumeriqueCAF,
      nom: 'Point numérique CAF',
      description:
        'Les points numériques caf.fr sont des espaces numériques aménagés mettant à disposition des ordinateurs, scanners et imprimantes, pour effectuer vos démarches en ligne.',
      url: 'https://www.caf.fr/allocataires/caf-de-l-essonne/actualites-departementales/vos-points-relais-et-points-numeriques-caffr',
      carracteristiques: [
        Service.RealiserDesDemarchesAdministratives,
        Service.AccompagnerLesDemarchesDeSante,
        ModaliteAccompagnement.Seul
      ]
    }
  ],
  [
    LabelNational.PointRelaisCAF,
    {
      ref: LabelNational.PointRelaisCAF,
      nom: 'Point relais CAF',
      description:
        'les points relais caf.fr sont des espaces numériques aménagés mettant à disposition des ordinateurs, scanners et imprimantes, pour effectuer vos démarches en ligne.',
      url: 'https://www.caf.fr/allocataires/caf-de-l-essonne/actualites-departementales/vos-points-relais-et-points-numeriques-caffr',
      carracteristiques: [
        Service.RealiserDesDemarchesAdministratives,
        Service.AccompagnerLesDemarchesDeSante,
        ModaliteAccompagnement.Seul,
        ModaliteAccompagnement.AvecDeLAide
      ]
    }
  ],
  [
    LabelNational.RelaisPoleEmploi,
    {
      ref: LabelNational.RelaisPoleEmploi,
      nom: 'Relais Pôle Emploi',
      description:
        "Les Relais Emploi travaillent en partenariat avec Pôle Emploi, ils ont pour mission de renseigner toutes personnes en recherche d’emploi, stages, formations et d'apporter des informations diverses en lien avec l’emploi.",
      url: 'https://www.pole-emploi.fr/',
      carracteristiques: [Service.FavoriserMonInsertionProfessionnelle, Service.CreerEtDevelopperMonEntreprise]
    }
  ]
]);

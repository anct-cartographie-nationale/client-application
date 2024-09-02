import {
  DispositifProgrammeNational,
  ModaliteAccompagnement,
  PublicSpecifiquementAdresse,
  Service
} from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LabelPresentation } from './label.presentation';

export const labelToDisplayMap: Map<DispositifProgrammeNational, LabelPresentation> = new Map<
  DispositifProgrammeNational,
  LabelPresentation
>([
  [
    DispositifProgrammeNational.ConseillersNumeriques,
    {
      ref: DispositifProgrammeNational.ConseillersNumeriques,
      nom: DispositifProgrammeNational.ConseillersNumeriques,
      description:
        'Un Conseiller numérique a pour mission d’accompagner les Français dans leur appropriation des usages numériques quotidiens',
      url: 'https://www.conseiller-numerique.gouv.fr/',
      carracteristiques: [
        Service.AideAuxDemarchesAdministratives,
        Service.InsertionProfessionnelleViaLeNumerique,
        Service.MaitriseDesOutilsNumeriquesDuQuotidien,
        Service.ParentaliteEtEducationAvecLeNumerique,
        Service.ComprehensionDuMondeNumerique,
        Service.UtilisationSecuriseeDuNumerique,
        ModaliteAccompagnement.AccompagnementIndividuel
      ]
    }
  ],
  [
    DispositifProgrammeNational.AidantsConnect,
    {
      ref: DispositifProgrammeNational.AidantsConnect,
      nom: DispositifProgrammeNational.AidantsConnect,
      description:
        "Aidants Connect permet à des professionnels de réaliser des démarches administratives à la place d'un usager de façon sécurisée.",
      url: 'https://aidantsconnect.beta.gouv.fr/',
      carracteristiques: [
        Service.AideAuxDemarchesAdministratives,
        Service.InsertionProfessionnelleViaLeNumerique,
        ModaliteAccompagnement.AccompagnementIndividuel
      ]
    }
  ],
  [
    DispositifProgrammeNational.BibliothequesNumeriqueDeReference,
    {
      ref: DispositifProgrammeNational.BibliothequesNumeriqueDeReference,
      nom: DispositifProgrammeNational.BibliothequesNumeriqueDeReference,
      description:
        'Le programme des « Bibliothèques numériques de référence » a pour vocation d’aider les collectivités territoriales à se doter d’infrastructures informatiques et numériques de haut niveau afin de proposer aux publics de leurs bibliothèques des collections et services numériques de premier plan',
      url: 'https://www.culture.gouv.fr/Thematiques/livre-et-lecture/les-bibliotheques-publiques/Numerique-et-bibliotheques/Les-Bibliotheques-numeriques-de-reference',
      carracteristiques: [Service.LoisirsEtCreationsNumeriques]
    }
  ],
  [
    DispositifProgrammeNational.CertificationPIX,
    {
      ref: DispositifProgrammeNational.CertificationPIX,
      nom: DispositifProgrammeNational.CertificationPIX,
      description:
        'La Certification Pix est un diplôme officiel qui reconnaît et valorise les compétences numériques des lauréats.',
      url: 'https://pix.fr/se-certifier',
      carracteristiques: [
        Service.InsertionProfessionnelleViaLeNumerique,
        Service.MaitriseDesOutilsNumeriquesDuQuotidien,
        Service.ComprehensionDuMondeNumerique,
        Service.UtilisationSecuriseeDuNumerique
      ]
    }
  ],
  [
    DispositifProgrammeNational.EmmausConnect,
    {
      ref: DispositifProgrammeNational.EmmausConnect,
      nom: DispositifProgrammeNational.EmmausConnect,
      description:
        'Emmaüs Connect accompagne les personnes en situation de précarité pour accéder aux services numériques essentiels.',
      url: 'https://emmaus-connect.org/',
      carracteristiques: [Service.AccesInternetEtMaterielInformatique]
    }
  ],
  [
    DispositifProgrammeNational.FranceServices,
    {
      ref: DispositifProgrammeNational.FranceServices,
      nom: DispositifProgrammeNational.FranceServices,
      description:
        'Une maison France services est un lieu qui combine accueil physique et accompagnement numérique, et qui regroupe en un même lieu plusieurs services.',
      url: 'https://www.economie.gouv.fr/particuliers/france-services',
      carracteristiques: [Service.AideAuxDemarchesAdministratives, Service.InsertionProfessionnelleViaLeNumerique]
    }
  ],
  [
    DispositifProgrammeNational.LaCroixRouge,
    {
      ref: DispositifProgrammeNational.LaCroixRouge,
      nom: DispositifProgrammeNational.LaCroixRouge,
      description:
        "La Croix-Rouge française offre un accompagnement numérique personnalisé, avec des points d'accès à des ordinateurs et des imprimantes mis à disposition dans ses lieux d'accueil de jour, ses vestiboutiques, ainsi que ses dispositifs mobiles qui sillonnent le territoire pour aller à la rencontre des usagers.",
      url: 'https://www.croix-rouge.fr/aide-a-l-insertion/jai-besoin-detre-aide-sur-les-outils-numeriques',
      carracteristiques: [
        Service.MaitriseDesOutilsNumeriquesDuQuotidien,
        Service.InsertionProfessionnelleViaLeNumerique,
        Service.UtilisationSecuriseeDuNumerique,
        Service.AccesInternetEtMaterielInformatique
      ]
    }
  ],
  [
    DispositifProgrammeNational.GrandeEcoleDuNumerique,
    {
      ref: DispositifProgrammeNational.GrandeEcoleDuNumerique,
      nom: DispositifProgrammeNational.GrandeEcoleDuNumerique,
      description:
        "les Grandes écoles du numérique visent à apporter une réponse aux besoins en compétences dans les métiers du numérique et à favoriser la formation et l'insertion sociale et professionnelle des personnes éloignées de l'emploi.",
      url: 'https://www.grandeecolenumerique.fr/',
      carracteristiques: [Service.InsertionProfessionnelleViaLeNumerique, Service.LoisirsEtCreationsNumeriques]
    }
  ],
  [
    DispositifProgrammeNational.PointNumeriqueCAF,
    {
      ref: DispositifProgrammeNational.PointNumeriqueCAF,
      nom: DispositifProgrammeNational.PointNumeriqueCAF,
      description:
        'Les points numériques caf.fr sont des espaces numériques aménagés mettant à disposition des ordinateurs, scanners et imprimantes, pour effectuer vos démarches en ligne.',
      url: 'https://www.caf.fr/allocataires/caf-de-l-essonne/actualites-departementales/vos-points-relais-et-points-numeriques-caffr',
      carracteristiques: [Service.AideAuxDemarchesAdministratives, ModaliteAccompagnement.EnAutonomie]
    }
  ],
  [
    DispositifProgrammeNational.PromeneursDuNet,
    {
      ref: DispositifProgrammeNational.PromeneursDuNet,
      nom: DispositifProgrammeNational.PromeneursDuNet,
      description:
        'Les Promeneurs du Net sont des professionnels qui créent, maintiennent le lien, écoutent, conseillent et soutiennent les jeunes sur Internet.',
      url: 'https://www.promeneursdunet.fr/',
      carracteristiques: [
        Service.MaitriseDesOutilsNumeriquesDuQuotidien,
        Service.ComprehensionDuMondeNumerique,
        Service.UtilisationSecuriseeDuNumerique,
        ModaliteAccompagnement.AccompagnementIndividuel,
        PublicSpecifiquementAdresse.Jeunes
      ]
    }
  ],
  [
    DispositifProgrammeNational.RelaisNumeriqueEmmausConnect,
    {
      ref: DispositifProgrammeNational.RelaisNumeriqueEmmausConnect,
      nom: DispositifProgrammeNational.RelaisNumeriqueEmmausConnect,
      description:
        'Les Relais Numériques, ce sont des structures de l’action sociale qui proposent de l’aide sur le numérique aux personnes en situation de précarité avec le soutien opérationnel de l’association Emmaüs Connect.',
      url: 'https://lesrelaisnumeriques.org/',
      carracteristiques: [Service.InsertionProfessionnelleViaLeNumerique, Service.AideAuxDemarchesAdministratives]
    }
  ]
]);

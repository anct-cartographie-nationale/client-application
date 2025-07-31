export type TypologiePresentation = {
  nom: string;
  type?: string;
  sousType?: string;
  lieuxCount?: number;
  lieuxPercentage?: string;
};

type DataInclusionTypologieSchema = {
  label: string;
  type: string;
  subtype?: string;
};

type DataInclusionTypologiesSchema = {
  [key: string]: DataInclusionTypologieSchema;
};

export const DataInclusionTypologies: DataInclusionTypologiesSchema = {
  ACI: {
    label: 'Structures porteuses d’ateliers et chantiers d’insertion (ACI)',
    type: 'association'
  },
  ACIPHC: {
    label: 'SIAE — Atelier chantier d’insertion premières heures en chantier',
    type: 'association'
  },
  AFPA: {
    label: 'Agence nationale pour la formation professionnelle des adultes (AFPA)',
    type: 'publique',
    subtype: 'autre'
  },
  AI: {
    label: 'Associations intermédiaires (AI)',
    type: 'association'
  },
  ASE: {
    label: 'Aide sociale à l’enfance (ASE)',
    type: 'publique',
    subtype: 'departement'
  },
  ASSO: {
    label: 'Associations',
    type: 'association'
  },
  ASSO_CHOMEUR: {
    label: 'Associations de chômeurs',
    type: 'association'
  },
  Autre: {
    label: 'Autre',
    type: 'privee'
  },
  BIB: {
    label: 'Bibliothèque / Médiathèque',
    type: 'publique',
    subtype: 'commune'
  },
  CAARUD: {
    label: 'CAARUD - Centre d’accueil et d’accompagnement à la réduction des risques pour usagers de drogues',
    type: 'publique',
    subtype: 'autre'
  },
  CADA: {
    label: 'CADA - Centre d’accueil de demandeurs d’asile',
    type: 'publique',
    subtype: 'autre'
  },
  CAF: {
    label: 'Caisse d’allocations familiales (CAF)',
    type: 'publique',
    subtype: 'autre'
  },
  CAP_EMPLOI: {
    label: 'Cap emploi',
    type: 'publique',
    subtype: 'autre'
  },
  CAVA: {
    label: 'Centres d’adaptation à la vie active (CAVA)',
    type: 'association'
  },
  CC: {
    label: 'Communautés de Commune',
    type: 'publique',
    subtype: 'epci'
  },
  CCAS: {
    label: 'Centres communaux d’action sociale (CCAS)',
    type: 'publique',
    subtype: 'commune'
  },
  CCONS: {
    label: 'Chambres consulaires (CCI, CMA, CA)',
    type: 'publique',
    subtype: 'autre'
  },
  CD: {
    label: 'Conseils Départementaux (CD)',
    type: 'publique',
    subtype: 'departement'
  },
  CHRS: {
    label: 'Centres d’hébergement et de réinsertion sociale (CHRS)',
    type: 'association'
  },
  CHU: {
    label: 'Centres d’hébergement d’urgence (CHU)',
    type: 'association'
  },
  CIAS: {
    label: 'Centres intercommunaux d’action sociale (CIAS)',
    type: 'publique',
    subtype: 'epci'
  },
  CIDFF: {
    label: 'Centres d’information sur les droits des femmes et des familles (CIDFF)',
    type: 'association'
  },
  CITMET: {
    label: 'Cité des métiers',
    type: 'association'
  },
  CPH: {
    label: 'Centres provisoires d’hébergement (CPH)',
    type: 'association'
  },
  CS: {
    label: 'Centre social',
    type: 'association'
  },
  CSAPA: {
    label: 'CSAPA - Centre de soins, d’accompagnement et de prévention en addictologie',
    type: 'association'
  },
  DEETS: {
    label: 'Directions de l’Economie, de l’Emploi, du Travail et des Solidarités (DEETS)',
    type: 'publique',
    subtype: 'autre'
  },
  DEPT: {
    label: 'Services sociaux du Conseil départemental',
    type: 'publique',
    subtype: 'departement'
  },
  DIPLP: {
    label: 'Délégation interministérielles à la prévention et à la lutte contre la pauvreté',
    type: 'publique',
    subtype: 'autre'
  },
  E2C: {
    label: 'E2C - École de la deuxième chance',
    type: 'association'
  },
  EA: {
    label: 'Entreprise adaptée (EA)',
    type: 'privee'
  },
  EATT: {
    label: 'Entreprise Adaptée (EATT)',
    type: 'privee'
  },
  EI: {
    label: 'Entreprises d’insertion (EI)',
    type: 'privee'
  },
  EITI: {
    label: 'Entreprises d’insertion par le travail indépendant (EITI)',
    type: 'privee'
  },
  EPCI: {
    label: 'Intercommunalité (EPCI)',
    type: 'publique',
    subtype: 'epci'
  },
  EPIDE: {
    label: 'EPIDE - Établissement pour l’insertion dans l’emploi',
    type: 'publique',
    subtype: 'autre'
  },
  ESS: {
    label: 'Entreprise de l’Économie Sociale et Solidaire',
    type: 'privee'
  },
  ETTI: {
    label: 'Entreprises de travail temporaire d’insertion (ETTI)',
    type: 'privee'
  },
  FAIS: {
    label: 'Fédérations d’acteurs de l’insertion et de la solidarité',
    type: 'association'
  },
  GEIQ: {
    label: 'Groupements d’employeurs pour l’insertion et la qualification (GEIQ)',
    type: 'privee'
  },
  HUDA: {
    label: 'HUDA - Hébergement d’urgence pour demandeurs d’asile',
    type: 'association'
  },
  MDE: {
    label: 'Maison de l’emploi',
    type: 'publique',
    subtype: 'autre'
  },
  MDEF: {
    label: 'Maison de l’emploi et de la formation',
    type: 'publique',
    subtype: 'autre'
  },
  MDPH: {
    label: 'Maison Départementale des Personnes Handicapées',
    type: 'publique',
    subtype: 'departement'
  },
  MDS: {
    label: 'Maison Départementale des Solidarités',
    type: 'publique',
    subtype: 'departement'
  },
  MJC: {
    label: 'Maison des jeunes et de la culture',
    type: 'association'
  },
  ML: {
    label: 'Mission Locale',
    type: 'publique',
    subtype: 'autre'
  },
  MQ: {
    label: 'Maison de quartier',
    type: 'association'
  },
  MSA: {
    label: 'Mutualité Sociale Agricole',
    type: 'publique',
    subtype: 'autre'
  },
  MUNI: {
    label: 'Municipalités',
    type: 'publique',
    subtype: 'commune'
  },
  OACAS: {
    label: 'Structures agréées Organisme d’accueil communautaire et d’activité solidaire (OACAS)',
    type: 'association'
  },
  ODC: {
    label: 'Organisation délégataire d’un CD',
    type: 'publique',
    subtype: 'departement'
  },
  OF: {
    label: 'Organisme de formations',
    type: 'privee'
  },
  OIL: {
    label: 'Opérateur d’intermédiation locative',
    type: 'association'
  },
  OPCS: {
    label: 'Organisation porteuse de la clause sociale',
    type: 'association'
  },
  PAD: {
    label: 'Point d’Accès au Droit',
    type: 'association'
  },
  PE: {
    label: 'Pôle emploi',
    type: 'publique',
    subtype: 'autre'
  },
  PENSION: {
    label: 'Pension de famille / résidence accueil',
    type: 'association'
  },
  PIJ_BIJ: {
    label: 'Points et bureaux information jeunesse (PIJ/BIJ)',
    type: 'publique',
    subtype: 'autre'
  },
  PIMMS: {
    label: 'Pimms Médiation',
    type: 'association'
  },
  PJJ: {
    label: 'Protection judiciaire de la jeunesse (PJJ)',
    type: 'publique',
    subtype: 'autre'
  },
  PLIE: {
    label: 'Plans locaux pour l’insertion et l’emploi (PLIE)',
    type: 'publique',
    subtype: 'departement'
  },
  PREF: {
    label: 'Préfecture, Sous-Préfecture',
    type: 'publique',
    subtype: 'autre'
  },
  PREVENTION: {
    label: 'Service ou club de prévention',
    type: 'publique',
    subtype: 'departement'
  },
  REG: {
    label: 'Région',
    type: 'publique',
    subtype: 'autre'
  },
  RFS: {
    label: 'Réseau France Services',
    type: 'publique',
    subtype: 'autre'
  },
  RS_FJT: {
    label: 'Résidence sociale / FJT - Foyer de Jeunes Travailleurs',
    type: 'association'
  },
  SCP: {
    label: 'Services et clubs de prévention',
    type: 'publique',
    subtype: 'departement'
  },
  SPIP: {
    label: 'Services pénitentiaires d’insertion et de probation (SPIP)',
    type: 'publique',
    subtype: 'autre'
  },
  TIERS_LIEUX: {
    label: 'Tiers lieu & coworking',
    type: 'privee'
  },
  UDAF: {
    label: 'Union Départementale d’Aide aux Familles (UDAF)',
    type: 'association'
  }
};

export const TOTAL_SCORE_COMPLETION: number = 41;

export type ScoreDetail = {
  score: number;
  name: string;
};

export type ScorePresence = {
  name: string;
  presence: boolean;
};

type ScoreCompletion = {
  [key: string]: ScoreDetail | ScoreContact | ScorePresentation | ScoreLocalisation;
};

type ScoreContact = {
  telephone: ScoreDetail;
  courriel: ScoreDetail;
  site_web: ScoreDetail;
};

type ScorePresentation = {
  presentation_detail: ScoreDetail;
  presentation_resume: ScoreDetail;
};

type ScoreLocalisation = {
  latitude: ScoreDetail;
  longitude: ScoreDetail;
};

export const scoreCompletionTable: ScoreCompletion = {
  nom: { score: 2, name: 'Nom' },
  adresse: { score: 2, name: 'Adresse' },
  commune: { score: 2, name: 'Commune' },
  code_postal: { score: 2, name: 'Code postal' },
  services: { score: 2, name: 'Services' },
  horaires: { score: 2, name: 'Horaires' },
  typologies: { score: 2, name: 'Typologie' },
  contact: {
    telephone: { score: 2, name: 'Téléphone' },
    courriel: { score: 2, name: 'Courriel' },
    site_web: { score: 2, name: 'Site web' }
  },
  presentation: {
    presentation_detail: { score: 2, name: 'Présentation détaillée' },
    presentation_resume: { score: 2, name: 'Présentation résumée' }
  },
  date_maj: { score: 2, name: 'Date de mise à jour' },
  publics_accueillis: { score: 2, name: 'Publics accueillis' },
  conditions_acces: { score: 2, name: 'Conditions d’accès' },
  labels_nationaux: { score: 2, name: 'Label nationaux' },
  autres_labels: { score: 2, name: 'Autres labels' },
  modalites_accompagnement: { score: 2, name: 'Modalités d’accompagnement' },
  accessibilite: { score: 1, name: 'Accessibilité' },
  localisation: {
    latitude: { score: 1, name: 'Latitude' },
    longitude: { score: 1, name: 'Longitude' }
  },
  prise_rdv: { score: 1, name: 'Prise de RDV' },
  source: { score: 1, name: 'Source' },
  pivot: { score: 2, name: 'Pivot' }
};

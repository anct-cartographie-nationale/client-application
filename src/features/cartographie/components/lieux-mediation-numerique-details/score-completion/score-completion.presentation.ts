export const TOTAL_SCORE_COMPLETION: number = 41;

type Score = number;

type ScoreCompletion = {
  [key: string]: Score | ScoreContact | ScorePresentation | ScoreLocalisation;
};

type ScoreContact = {
  telephone: Score;
  courriel: Score;
  site_web: Score;
};

type ScorePresentation = {
  presentation_detail: Score;
  presentation_resume: Score;
};

type ScoreLocalisation = {
  latitude: Score;
  longitude: Score;
};

export const scoreCompletionTable: ScoreCompletion = {
  nom: 2,
  adresse: 2,
  commune: 2,
  code_postal: 2,
  services: 2,
  horaires: 2,
  typologies: 2,
  contact: {
    telephone: 2,
    courriel: 2,
    site_web: 2
  },
  presentation: {
    presentation_detail: 2,
    presentation_resume: 2
  },
  date_maj: 2,
  publics_accueillis: 2,
  conditions_acces: 2,
  labels_nationaux: 2,
  modalites_accompagnement: 2,
  accessibilite: 1,
  localisation: {
    latitude: 1,
    longitude: 1
  },
  prise_rdv: 1,
  source: 1,
  pivot: 2
};

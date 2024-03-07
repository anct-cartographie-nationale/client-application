import { LieuMediationNumeriqueDetailsPresentation } from '../../../../cartographie/presenters';
import { ScoreDetail, ScorePresence, TOTAL_SCORE_COMPLETION, scoreCompletionTable } from './score-completion.presentation';

const NESTED_FIELDS: string[] = ['contact', 'presentation', 'localisation'];

const calculateNestedFieldScore = (
  nestedFieldName: string,
  lieuMediationNumerique: LieuMediationNumeriqueDetailsPresentation
): number => {
  let nestedScore = 0;
  const nestedFieldValue = lieuMediationNumerique[nestedFieldName as keyof LieuMediationNumeriqueDetailsPresentation];
  Object.entries(scoreCompletionTable[nestedFieldName]).forEach(([key, value]) => {
    if (nestedFieldValue && nestedFieldValue.hasOwnProperty(key)) {
      nestedScore += value.score;
    }
  });
  return nestedScore;
};

export const scoreCompletion = (lieuMediationNumerique: LieuMediationNumeriqueDetailsPresentation): number => {
  const scoreSimpleField: number = Object.keys(scoreCompletionTable)
    .filter((field) => !NESTED_FIELDS.includes(field) && lieuMediationNumerique.hasOwnProperty(field))
    .reduce((score, curr) => score + (scoreCompletionTable[curr] as ScoreDetail).score, 0);

  const scoreNestedField: number = NESTED_FIELDS.reduce(
    (score, nestedField) => score + calculateNestedFieldScore(nestedField, lieuMediationNumerique),
    0
  );

  const scoreCompletionPercent: number = ((scoreSimpleField + scoreNestedField) / TOTAL_SCORE_COMPLETION) * 100;
  return Math.round(scoreCompletionPercent);
};

export const scoreCompletionPresence = (lieuMediationNumerique: LieuMediationNumeriqueDetailsPresentation): ScorePresence[] => {
  const fieldPresence: ScorePresence[] = [];

  Object.keys(scoreCompletionTable).forEach((field) => {
    if (!NESTED_FIELDS.includes(field)) {
      fieldPresence.push({
        name: (scoreCompletionTable[field] as ScoreDetail).name,
        presence: lieuMediationNumerique.hasOwnProperty(field)
      });
    }
  });

  const nestedFieldsPresence = (
    nestedFieldName: string,
    lieuMediationNumerique: LieuMediationNumeriqueDetailsPresentation
  ): void => {
    const nestedFieldValue = lieuMediationNumerique[nestedFieldName as keyof LieuMediationNumeriqueDetailsPresentation] || {};
    Object.keys(scoreCompletionTable[nestedFieldName]).forEach((key) => {
      fieldPresence.push({
        name: (scoreCompletionTable[nestedFieldName] as Record<string, ScoreDetail>)[key].name,
        presence: nestedFieldValue.hasOwnProperty(key)
      });
    });
  };

  NESTED_FIELDS.forEach((nestedField) => {
    nestedFieldsPresence(nestedField, lieuMediationNumerique);
  });

  return fieldPresence;
};

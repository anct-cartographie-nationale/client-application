import { LieuMediationNumeriqueDetailsPresentation } from '../../../../cartographie/presenters';
import { TOTAL_SCORE_COMPLETION, scoreCompletionTable } from './score-completion.presentation';

const calculateNestedFieldScore = (
  nestedFieldName: string,
  lieuMediationNumerique: LieuMediationNumeriqueDetailsPresentation
): number => {
  let nestedScore = 0;
  const nestedFieldValue = lieuMediationNumerique[nestedFieldName as keyof LieuMediationNumeriqueDetailsPresentation];
  Object.entries(scoreCompletionTable[nestedFieldName]).forEach(([key, value]) => {
    if (nestedFieldValue && nestedFieldValue.hasOwnProperty(key)) {
      nestedScore += value;
    }
  });
  return nestedScore;
};

export const scoreCompletion = (lieuMediationNumerique: LieuMediationNumeriqueDetailsPresentation): number => {
  const nestedFields: string[] = ['contact', 'presentation', 'localisation'];

  const scoreSimpleField: number = Object.keys(scoreCompletionTable)
    .filter((field) => !nestedFields.includes(field) && lieuMediationNumerique.hasOwnProperty(field))
    .reduce((score, curr) => score + (scoreCompletionTable[curr] as number), 0);

  const scoreNestedField: number = nestedFields.reduce(
    (score, nestedField) => score + calculateNestedFieldScore(nestedField, lieuMediationNumerique),
    0
  );

  const scoreCompletionPercent: number = ((scoreSimpleField + scoreNestedField) / TOTAL_SCORE_COMPLETION) * 100;
  return Math.round(scoreCompletionPercent);
};

import { LieuMediationNumeriqueDetailsPresentation } from '../../../presenters';
import {
  SCORE_FIELDS,
  ScoreCoefficientField,
  ScorePresenceField,
  TOTAL_SCORE_COEFFICIENTS
} from './score-completion.presentation';

type NestedRecord = { [k: string]: NestedRecord } | undefined;

const toNestedProperty = (property: NestedRecord, nestedField: string): NestedRecord =>
  property && property.hasOwnProperty(nestedField) ? property[nestedField] : undefined;

const hasField = (field: string) => (lieuMediationNumerique: LieuMediationNumeriqueDetailsPresentation) =>
  field.split('.').reduce(toNestedProperty, lieuMediationNumerique as unknown as NestedRecord) !== undefined;

const computeScore =
  (lieuMediationNumerique: LieuMediationNumeriqueDetailsPresentation) =>
  (score: number, { field, coefficient }: ScoreCoefficientField): number =>
    hasField(field)(lieuMediationNumerique) ? score + coefficient : score;

export const scoreCompletionRate = (lieuMediationNumerique: LieuMediationNumeriqueDetailsPresentation): number =>
  Math.round((SCORE_FIELDS.reduce(computeScore(lieuMediationNumerique), 0) / TOTAL_SCORE_COEFFICIENTS) * 100);

export const scoreCompletionPresence = (
  lieuMediationNumerique: LieuMediationNumeriqueDetailsPresentation
): ScorePresenceField[] =>
  SCORE_FIELDS.map(
    ({ field, name }: ScoreCoefficientField): ScorePresenceField => ({
      presence: hasField(field)(lieuMediationNumerique),
      field,
      name
    })
  );

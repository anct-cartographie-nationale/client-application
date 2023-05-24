import { ConditionAcces } from '@gouvfr-anct/lieux-de-mediation-numerique';

const gratuitAvecCondition: ConditionAcces[] = [
  ConditionAcces.Adhesion,
  ConditionAcces.GratuitSousCondition,
  ConditionAcces.AccepteLePassNumerique
];

const isGratuitAvecCondition = (conditionAcces: ConditionAcces): boolean => gratuitAvecCondition.includes(conditionAcces);

const onlyGratuitSansConditions = (conditionAcces: ConditionAcces): boolean => !isGratuitAvecCondition(conditionAcces);

const isGratuitSansCondition = (conditionAcces: ConditionAcces): boolean => conditionAcces === ConditionAcces.Gratuit;

const exceptGratuitSansConditions = (conditionAcces: ConditionAcces): boolean => !isGratuitSansCondition(conditionAcces);

export const preventInconsistentSelection = (
  lastConditionAccesSelected: ConditionAcces,
  conditionAccesSelection: ConditionAcces[]
): ConditionAcces[] => {
  if (isGratuitSansCondition(lastConditionAccesSelected)) return conditionAccesSelection.filter(onlyGratuitSansConditions);
  if (isGratuitAvecCondition(lastConditionAccesSelected)) return conditionAccesSelection.filter(exceptGratuitSansConditions);

  return conditionAccesSelection;
};

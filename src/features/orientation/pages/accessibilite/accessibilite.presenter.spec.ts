import { ConditionAcces } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { preventInconsistentSelection } from './accessibilite.presenter';

describe('accessibilite presenter', (): void => {
  it('should do nothing to "Gratuit sous conditions sociales" when "Gratuit avec adhésion" is selected', (): void => {
    const conditionAccesSelection: ConditionAcces[] = [ConditionAcces.GratuitSousCondition, ConditionAcces.Adhesion];

    const consistentConditionAccesSelection: ConditionAcces[] = preventInconsistentSelection(
      ConditionAcces.Adhesion,
      conditionAccesSelection
    );

    expect(consistentConditionAccesSelection).toStrictEqual([ConditionAcces.GratuitSousCondition, ConditionAcces.Adhesion]);
  });

  it('should remove "Gratuit sous conditions sociales" when "Gratuit sans conditions" is selected', (): void => {
    const conditionAccesSelection: ConditionAcces[] = [ConditionAcces.GratuitSousCondition, ConditionAcces.Gratuit];

    const consistentConditionAccesSelection: ConditionAcces[] = preventInconsistentSelection(
      ConditionAcces.Gratuit,
      conditionAccesSelection
    );

    expect(consistentConditionAccesSelection).toStrictEqual([ConditionAcces.Gratuit]);
  });

  it('should remove "Gratuit sans conditions" when "Gratuit sous conditions sociales" is selected', (): void => {
    const conditionAccesSelection: ConditionAcces[] = [ConditionAcces.Gratuit, ConditionAcces.GratuitSousCondition];

    const consistentConditionAccesSelection: ConditionAcces[] = preventInconsistentSelection(
      ConditionAcces.GratuitSousCondition,
      conditionAccesSelection
    );

    expect(consistentConditionAccesSelection).toStrictEqual([ConditionAcces.GratuitSousCondition]);
  });

  it('should remove "Gratuit avec adhésion" when "Gratuit sans conditions" is selected', (): void => {
    const conditionAccesSelection: ConditionAcces[] = [ConditionAcces.Adhesion, ConditionAcces.Gratuit];

    const consistentConditionAccesSelection: ConditionAcces[] = preventInconsistentSelection(
      ConditionAcces.Gratuit,
      conditionAccesSelection
    );

    expect(consistentConditionAccesSelection).toStrictEqual([ConditionAcces.Gratuit]);
  });

  it('should remove "Gratuit sans conditions" when "Gratuit avec adhésion" is selected', (): void => {
    const conditionAccesSelection: ConditionAcces[] = [ConditionAcces.Gratuit, ConditionAcces.Adhesion];

    const consistentConditionAccesSelection: ConditionAcces[] = preventInconsistentSelection(
      ConditionAcces.Adhesion,
      conditionAccesSelection
    );

    expect(consistentConditionAccesSelection).toStrictEqual([ConditionAcces.Adhesion]);
  });

  it('should remove all other gratuits when "Gratuit sans conditions" is selected', (): void => {
    const conditionAccesSelection: ConditionAcces[] = [
      ConditionAcces.GratuitSousCondition,
      ConditionAcces.Adhesion,
      ConditionAcces.AccepteLePassNumerique,
      ConditionAcces.Gratuit
    ];

    const consistentConditionAccesSelection: ConditionAcces[] = preventInconsistentSelection(
      ConditionAcces.Gratuit,
      conditionAccesSelection
    );

    expect(consistentConditionAccesSelection).toStrictEqual([ConditionAcces.Gratuit]);
  });

  it('should remove "Gratuit sans conditions" when "Gratuit avec le Pass Numérique" is selected', (): void => {
    const conditionAccesSelection: ConditionAcces[] = [ConditionAcces.Gratuit, ConditionAcces.AccepteLePassNumerique];

    const consistentConditionAccesSelection: ConditionAcces[] = preventInconsistentSelection(
      ConditionAcces.AccepteLePassNumerique,
      conditionAccesSelection
    );

    expect(consistentConditionAccesSelection).toStrictEqual([ConditionAcces.AccepteLePassNumerique]);
  });

  it('should not remove "Payant" when "Gratuit sans conditions" is selected', (): void => {
    const conditionAccesSelection: ConditionAcces[] = [ConditionAcces.Payant, ConditionAcces.Gratuit];

    const consistentConditionAccesSelection: ConditionAcces[] = preventInconsistentSelection(
      ConditionAcces.Gratuit,
      conditionAccesSelection
    );

    expect(consistentConditionAccesSelection).toStrictEqual([ConditionAcces.Payant, ConditionAcces.Gratuit]);
  });

  it('should remove "Gratuit sous conditions sociales" but not "Payant" when "Gratuit sans conditions" is selected', (): void => {
    const conditionAccesSelection: ConditionAcces[] = [
      ConditionAcces.GratuitSousCondition,
      ConditionAcces.Payant,
      ConditionAcces.Gratuit
    ];

    const consistentConditionAccesSelection: ConditionAcces[] = preventInconsistentSelection(
      ConditionAcces.Gratuit,
      conditionAccesSelection
    );

    expect(consistentConditionAccesSelection).toStrictEqual([ConditionAcces.Payant, ConditionAcces.Gratuit]);
  });
});

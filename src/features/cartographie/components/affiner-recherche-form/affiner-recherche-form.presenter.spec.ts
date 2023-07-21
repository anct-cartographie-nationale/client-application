import { LieuMediationNumeriqueOnMapPresentation } from '../../presenters';
import { LabelNational } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { labelNationauxFrom } from './affiner-recherche-form.presenter';
import { LieuMediationNumeriquePresentation } from '../../../core/presenters';

describe('affiner recherche form presenter', (): void => {
  it('should not get any label national from lieux mediation numerique', (): void => {
    const LieuxMediationNumerique: LieuMediationNumeriquePresentation[] = [];

    const labelNationaux: LabelNational[] = labelNationauxFrom(LieuxMediationNumerique);

    expect(labelNationaux).toStrictEqual([]);
  });

  it('should get CnFS label national from lieux mediation numerique', (): void => {
    const LieuxMediationNumerique: LieuMediationNumeriquePresentation[] = [
      {
        labels_nationaux: [LabelNational.CNFS]
      } as LieuMediationNumeriquePresentation
    ];

    const labelNationaux: LabelNational[] = labelNationauxFrom(LieuxMediationNumerique);

    expect(labelNationaux).toStrictEqual([LabelNational.CNFS]);
  });

  it('should not get duplicated label national from lieux mediation numerique', (): void => {
    const LieuxMediationNumerique: LieuMediationNumeriquePresentation[] = [
      {
        labels_nationaux: [LabelNational.CNFS, LabelNational.CNFS]
      } as LieuMediationNumeriquePresentation
    ];

    const labelNationaux: LabelNational[] = labelNationauxFrom(LieuxMediationNumerique);

    expect(labelNationaux).toStrictEqual([LabelNational.CNFS]);
  });
});

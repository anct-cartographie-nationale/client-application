import { LabelNational } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { labelsAutresFrom, labelNationauxFrom } from './affiner-recherche-form.presenter';
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

  it('should not get any label autre from lieux mediation numerique', (): void => {
    const LieuxMediationNumerique: LieuMediationNumeriquePresentation[] = [];

    const autresLabels: string[] = labelsAutresFrom(LieuxMediationNumerique);

    expect(autresLabels).toStrictEqual([]);
  });

  it('should get Hinaura label autre from lieux mediation numerique', (): void => {
    const LieuxMediationNumerique: LieuMediationNumeriquePresentation[] = [
      {
        labels_autres: ['Hinaura']
      } as LieuMediationNumeriquePresentation
    ];

    const labelsAutres: string[] = labelsAutresFrom(LieuxMediationNumerique);

    expect(labelsAutres).toStrictEqual(['Hinaura']);
  });

  it('should not get duplicated label autre from lieux mediation numerique', (): void => {
    const LieuxMediationNumerique: LieuMediationNumeriquePresentation[] = [
      {
        labels_autres: ['Hinaura', 'Hinaura']
      } as LieuMediationNumeriquePresentation
    ];

    const labelsAutres: string[] = labelsAutresFrom(LieuxMediationNumerique);

    expect(labelsAutres).toStrictEqual(['Hinaura']);
  });
});

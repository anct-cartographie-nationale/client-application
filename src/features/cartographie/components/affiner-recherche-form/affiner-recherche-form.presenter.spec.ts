import { DispositifProgrammeNational } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { autresFormationsLabelsFrom, dispositifProgrammesNationauxFrom } from './affiner-recherche-form.presenter';
import { LieuMediationNumeriquePresentation } from '../../../core/presenters';

describe('affiner recherche form presenter', (): void => {
  it('should not get any label national from lieux mediation numerique', (): void => {
    const LieuxMediationNumerique: LieuMediationNumeriquePresentation[] = [];

    const labelNationaux: DispositifProgrammeNational[] = dispositifProgrammesNationauxFrom(LieuxMediationNumerique);

    expect(labelNationaux).toStrictEqual([]);
  });

  it('should get CnFS label national from lieux mediation numerique', (): void => {
    const LieuxMediationNumerique: LieuMediationNumeriquePresentation[] = [
      {
        dispositif_programmes_nationaux: [DispositifProgrammeNational.ConseillersNumeriques]
      } as LieuMediationNumeriquePresentation
    ];

    const labelNationaux: DispositifProgrammeNational[] = dispositifProgrammesNationauxFrom(LieuxMediationNumerique);

    expect(labelNationaux).toStrictEqual([DispositifProgrammeNational.ConseillersNumeriques]);
  });

  it('should not get duplicated label national from lieux mediation numerique', (): void => {
    const LieuxMediationNumerique: LieuMediationNumeriquePresentation[] = [
      {
        dispositif_programmes_nationaux: [
          DispositifProgrammeNational.ConseillersNumeriques,
          DispositifProgrammeNational.ConseillersNumeriques
        ]
      } as LieuMediationNumeriquePresentation
    ];

    const labelNationaux: DispositifProgrammeNational[] = dispositifProgrammesNationauxFrom(LieuxMediationNumerique);

    expect(labelNationaux).toStrictEqual([DispositifProgrammeNational.ConseillersNumeriques]);
  });

  it('should not get any label autre from lieux mediation numerique', (): void => {
    const LieuxMediationNumerique: LieuMediationNumeriquePresentation[] = [];

    const autresLabels: string[] = autresFormationsLabelsFrom(LieuxMediationNumerique);

    expect(autresLabels).toStrictEqual([]);
  });

  it('should get Hinaura label autre from lieux mediation numerique', (): void => {
    const LieuxMediationNumerique: LieuMediationNumeriquePresentation[] = [
      {
        autres_formations_labels: ['Hinaura']
      } as LieuMediationNumeriquePresentation
    ];

    const labelsAutres: string[] = autresFormationsLabelsFrom(LieuxMediationNumerique);

    expect(labelsAutres).toStrictEqual(['Hinaura']);
  });

  it('should not get duplicated label autre from lieux mediation numerique', (): void => {
    const LieuxMediationNumerique: LieuMediationNumeriquePresentation[] = [
      {
        autres_formations_labels: ['Hinaura', 'Hinaura']
      } as LieuMediationNumeriquePresentation
    ];

    const labelsAutres: string[] = autresFormationsLabelsFrom(LieuxMediationNumerique);

    expect(labelsAutres).toStrictEqual(['Hinaura']);
  });
});

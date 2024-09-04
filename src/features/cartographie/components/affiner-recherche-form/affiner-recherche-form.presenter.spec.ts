import { DispositifProgrammeNational, FormationLabel, Service } from '@gouvfr-anct/lieux-de-mediation-numerique';
import {
  autresFormationsLabelsFrom,
  dispositifProgrammesNationauxFrom,
  formationsLabelsFrom,
  servicesFrom
} from './affiner-recherche-form.presenter';
import { LieuMediationNumeriquePresentation } from '../../../core/presenters';

describe('affiner recherche form presenter', (): void => {
  it('should not get any dispositif programme national from lieux mediation numerique', (): void => {
    const LieuxMediationNumerique: LieuMediationNumeriquePresentation[] = [];

    const labelNationaux: DispositifProgrammeNational[] = dispositifProgrammesNationauxFrom(LieuxMediationNumerique);

    expect(labelNationaux).toStrictEqual([]);
  });

  it('should get CnFS dispositif programme national from lieux mediation numerique', (): void => {
    const LieuxMediationNumerique: LieuMediationNumeriquePresentation[] = [
      {
        dispositif_programmes_nationaux: [DispositifProgrammeNational.ConseillersNumeriques]
      } as LieuMediationNumeriquePresentation
    ];

    const labelNationaux: DispositifProgrammeNational[] = dispositifProgrammesNationauxFrom(LieuxMediationNumerique);

    expect(labelNationaux).toStrictEqual([DispositifProgrammeNational.ConseillersNumeriques]);
  });

  it('should not get duplicated dispositif programme national from lieux mediation numerique', (): void => {
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

  it('should not get any formation label from lieux mediation numerique', (): void => {
    const LieuxMediationNumerique: LieuMediationNumeriquePresentation[] = [];

    const formationsLabels: FormationLabel[] = formationsLabelsFrom(LieuxMediationNumerique);

    expect(formationsLabels).toStrictEqual([]);
  });

  it('should get fabriques de territoire formation label from lieux mediation numerique', (): void => {
    const LieuxMediationNumerique: LieuMediationNumeriquePresentation[] = [
      {
        formations_labels: [FormationLabel.FabriquesDeTerritoire]
      } as LieuMediationNumeriquePresentation
    ];

    const formationsLabels: FormationLabel[] = formationsLabelsFrom(LieuxMediationNumerique);

    expect(formationsLabels).toStrictEqual([FormationLabel.FabriquesDeTerritoire]);
  });

  it('should not get duplicated formation label from lieux mediation numerique', (): void => {
    const LieuxMediationNumerique: LieuMediationNumeriquePresentation[] = [
      {
        formations_labels: [FormationLabel.FabriquesDeTerritoire, FormationLabel.FabriquesDeTerritoire]
      } as LieuMediationNumeriquePresentation
    ];

    const formationsLabels: FormationLabel[] = formationsLabelsFrom(LieuxMediationNumerique);

    expect(formationsLabels).toStrictEqual([FormationLabel.FabriquesDeTerritoire]);
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

  it('should not get any service from lieux mediation numerique', (): void => {
    const LieuxMediationNumerique: LieuMediationNumeriquePresentation[] = [];

    const services: Service[] = servicesFrom(LieuxMediationNumerique);

    expect(services).toStrictEqual([]);
  });

  it('should get loisirs et création numérique service from lieux mediation numerique', (): void => {
    const LieuxMediationNumerique: LieuMediationNumeriquePresentation[] = [
      {
        services: [Service.LoisirsEtCreationsNumeriques]
      } as LieuMediationNumeriquePresentation
    ];

    const services: Service[] = servicesFrom(LieuxMediationNumerique);

    expect(services).toStrictEqual([Service.LoisirsEtCreationsNumeriques]);
  });

  it('should not get services from lieux mediation numerique', (): void => {
    const LieuxMediationNumerique: LieuMediationNumeriquePresentation[] = [
      {
        services: [Service.LoisirsEtCreationsNumeriques, Service.LoisirsEtCreationsNumeriques]
      } as LieuMediationNumeriquePresentation
    ];

    const services: Service[] = servicesFrom(LieuxMediationNumerique);

    expect(services).toStrictEqual([Service.LoisirsEtCreationsNumeriques]);
  });
});

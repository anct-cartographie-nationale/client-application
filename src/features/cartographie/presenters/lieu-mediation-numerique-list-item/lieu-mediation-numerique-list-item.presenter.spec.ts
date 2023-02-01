import { ConditionAcces, LabelNational, Service } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LieuMediationNumeriqueListItemPresentation } from './lieu-mediation-numerique-list-item.presentation';
import { toLieuxMediationNumeriqueListItemsPresentation } from './lieu-mediation-numerique-list-item.presenter';
import { LieuMediationNumeriquePresentation } from '../../../core';

describe('lieux médiation numérique list item presenter', (): void => {
  it('should get minimal list item presenter', async (): Promise<void> => {
    const lieuxMediationNumerique: LieuMediationNumeriquePresentation[] = [
      {
        id: '6001a35f16b08100062e415f',
        nom: 'Anonymal',
        voie: '12 BIS RUE DE LECLERCQ',
        code_postal: '51100',
        commune: 'REIMS',
        date_maj: new Date('2022-10-10'),
        services: [Service.AccederADuMateriel],
        latitude: 46.2814605,
        longitude: 4.468874
      }
    ];

    const lieuMediationNumeriqueListItemPresenter: LieuMediationNumeriqueListItemPresentation[] =
      toLieuxMediationNumeriqueListItemsPresentation(lieuxMediationNumerique);

    expect(lieuMediationNumeriqueListItemPresenter).toStrictEqual<LieuMediationNumeriqueListItemPresentation[]>([
      {
        id: '6001a35f16b08100062e415f',
        nom: 'Anonymal',
        adresse: '12 Bis Rue De Leclercq 51100, Reims',
        latitude: 46.2814605,
        longitude: 4.468874,
        date_maj: new Date('2022-10-10')
      }
    ]);
  });

  it('should get full list item presenter', async (): Promise<void> => {
    const lieuxMediationNumerique: LieuMediationNumeriquePresentation[] = [
      {
        id: '6001a35f16b08100062e415f',
        nom: 'Anonymal',
        voie: '12 BIS RUE DE LECLERCQ',
        code_postal: '51100',
        complement_adresse: "Le patio du bois de l'aulne",
        commune: 'REIMS',
        date_maj: new Date('2022-10-10'),
        services: [Service.AccederADuMateriel],
        latitude: 46.2814605,
        longitude: 4.468874,
        telephone: '+33180059880',
        courriel: 'contact@laquincaillerie.tl',
        labels_nationaux: [LabelNational.CNFS, LabelNational.FrenchTech, LabelNational.FranceServices],
        conditions_acces: [ConditionAcces.Gratuit, ConditionAcces.GratuitSousCondition],
        distance: 3200,
        status: {
          label: 'Ouvert',
          limite: 'Ouvre mardi à 09h00'
        }
      }
    ];

    const lieuMediationNumeriqueListItemPresenter: LieuMediationNumeriqueListItemPresentation[] =
      toLieuxMediationNumeriqueListItemsPresentation(lieuxMediationNumerique);

    expect(lieuMediationNumeriqueListItemPresenter).toStrictEqual<LieuMediationNumeriqueListItemPresentation[]>([
      {
        id: '6001a35f16b08100062e415f',
        nom: 'Anonymal',
        adresse: "Le patio du bois de l'aulne, 12 Bis Rue De Leclercq 51100, Reims",
        latitude: 46.2814605,
        longitude: 4.468874,
        telephone: '+33180059880',
        courriel: 'contact@laquincaillerie.tl',
        date_maj: new Date('2022-10-10'),
        labels_nationaux: [LabelNational.CNFS, LabelNational.FranceServices],
        conditions_acces: {
          isFree: true,
          label: 'Gratuit'
        },
        distance: 3200,
        status: {
          label: 'Ouvert',
          limite: 'Ouvre mardi à 09h00'
        }
      }
    ]);
  });
});

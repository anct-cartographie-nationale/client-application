import {
  Frais,
  DispositifProgrammeNational,
  Service,
  Itinerances,
  Itinerance
} from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LieuMediationNumeriqueListItemPresentation } from './lieu-mediation-numerique-list-item.presentation';
import { toLieuxMediationNumeriqueListItemsPresentation } from './lieu-mediation-numerique-list-item.presenter';
import { LieuMediationNumeriquePresentation } from '../../../core/presenters';

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
        services: [Service.AccesInternetEtMaterielInformatique],
        latitude: 46.2814605,
        longitude: 4.468874
      }
    ];

    const lieuMediationNumeriqueListItemPresenter: LieuMediationNumeriqueListItemPresentation[] =
      toLieuxMediationNumeriqueListItemsPresentation(new Date('2023-02-09'))(lieuxMediationNumerique);

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

  it('should get list item presenter with single courriel', async (): Promise<void> => {
    const lieuxMediationNumerique: LieuMediationNumeriquePresentation[] = [
      {
        id: '6001a35f16b08100062e415f',
        nom: 'Anonymal',
        voie: '12 BIS RUE DE LECLERCQ',
        code_postal: '51100',
        commune: 'REIMS',
        date_maj: new Date('2022-10-10'),
        services: [Service.AccesInternetEtMaterielInformatique],
        latitude: 46.2814605,
        longitude: 4.468874,
        courriels: ['contact@laquincaillerie.tl']
      }
    ];

    const lieuMediationNumeriqueListItemPresenter: LieuMediationNumeriqueListItemPresentation[] =
      toLieuxMediationNumeriqueListItemsPresentation(new Date('2023-02-09'))(lieuxMediationNumerique);

    expect(lieuMediationNumeriqueListItemPresenter).toStrictEqual<LieuMediationNumeriqueListItemPresentation[]>([
      {
        id: '6001a35f16b08100062e415f',
        nom: 'Anonymal',
        adresse: '12 Bis Rue De Leclercq 51100, Reims',
        latitude: 46.2814605,
        longitude: 4.468874,
        date_maj: new Date('2022-10-10'),
        courriels: 'contact@laquincaillerie.tl'
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
        itinerance: Itinerances([Itinerance.Itinerant, Itinerance.Fixe]),
        services: [Service.MaterielInformatiqueAPrixSolidaire],
        latitude: 46.2814605,
        longitude: 4.468874,
        telephone: '+33180059880',
        courriels: ['contact@laquincaillerie.tl', 'accueil@laquincaillerie.tl', 'hello@laquincaillerie.tl'],
        dispositif_programmes_nationaux: [
          DispositifProgrammeNational.ConseillersNumeriques,
          DispositifProgrammeNational.PointNumeriqueCAF,
          DispositifProgrammeNational.FranceServices
        ],
        frais_a_charge: [Frais.Gratuit, Frais.GratuitSousCondition],
        distance: 3200,
        horaires: 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00'
      }
    ];

    const lieuMediationNumeriqueListItemPresenter: LieuMediationNumeriqueListItemPresentation[] =
      toLieuxMediationNumeriqueListItemsPresentation(new Date('2023-02-09'))(lieuxMediationNumerique);

    expect(lieuMediationNumeriqueListItemPresenter).toStrictEqual<LieuMediationNumeriqueListItemPresentation[]>([
      {
        id: '6001a35f16b08100062e415f',
        nom: 'Anonymal',
        adresse: "Le patio du bois de l'aulne, 12 Bis Rue De Leclercq 51100, Reims",
        latitude: 46.2814605,
        longitude: 4.468874,
        telephone: '+33180059880',
        courriels: 'contact@laquincaillerie.tl, accueil@laquincaillerie.tl, hello@laquincaillerie.tl',
        date_maj: new Date('2022-10-10'),
        itinerance: true,
        dispositif_programmes_nationaux: [
          DispositifProgrammeNational.ConseillersNumeriques,
          DispositifProgrammeNational.FranceServices
        ],
        frais_a_charge: {
          isFree: true,
          label: 'Gratuit'
        },
        distance: 3200,
        status: {
          label: 'Fermé',
          limite: "Ouvre aujourd'hui à 09h00"
        }
      }
    ]);
  });
});

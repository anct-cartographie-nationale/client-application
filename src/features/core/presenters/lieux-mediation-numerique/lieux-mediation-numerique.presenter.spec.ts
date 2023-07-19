import { firstValueFrom, Observable, of } from 'rxjs';
import { LieuxMediationNumeriqueRepository } from '../../repositories';
import {
  Adresse,
  ConditionAcces,
  ConditionsAcces,
  Id,
  LieuMediationNumerique,
  Localisation,
  ModaliteAccompagnement,
  ModalitesAccompagnement,
  Nom,
  Pivot,
  PublicAccueilli,
  PublicsAccueillis,
  Service,
  Services,
  Url
} from '@gouvfr-anct/lieux-de-mediation-numerique';
import { FilterPresentation } from '../filter';
import { LieuMediationNumeriquePresentation } from './lieu-mediation-numerique.presentation';
import { LieuxMediationNumeriquePresenter } from './lieux-mediation-numerique.presenter';
import { DepartementPresentation, RegionPresentation } from '../collectivite-territoriale';
import { NO_LOCALISATION } from '../../models';

describe('lieux-mediation-numerique-list presenter', (): void => {
  it('should append the distance from some localisation to a lieu mediation numerique', async (): Promise<void> => {
    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> =>
        of([
          {
            id: Id('structure-1'),
            nom: Nom('Anonymal'),
            pivot: Pivot('43493312300029'),
            adresse: Adresse({
              code_postal: '51100',
              commune: 'Reims',
              voie: '12 BIS RUE DE LECLERCQ'
            }),
            services: Services([Service.AccederADuMateriel]),
            date_maj: new Date('2022-10-10'),
            localisation: Localisation({
              latitude: 46.2814605,
              longitude: 4.468874
            })
          }
        ])
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriquePresentation: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(
        of(Localisation({ latitude: 45.7689958, longitude: 4.8343466 }))
      )
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriquePresentation).toStrictEqual([
      {
        id: 'structure-1',
        nom: 'Anonymal',
        code_postal: '51100',
        commune: 'Reims',
        date_maj: new Date('2022-10-10'),
        distance: 63586.94404350499,
        latitude: 46.2814605,
        longitude: 4.468874,
        services: [Service.AccederADuMateriel],
        voie: '12 BIS RUE DE LECLERCQ'
      }
    ]);
  });

  it('should not append the distance from some coordinates to a lieu mediation numerique when there is no coordinates', async (): Promise<void> => {
    const longitude: number = 4.8343466;
    const latitude: number = 45.7689958;

    const lieuMediationNumerique: LieuMediationNumerique = {
      id: Id('structure-1'),
      nom: Nom('Anonymal'),
      pivot: Pivot('43493312300029'),
      adresse: Adresse({
        code_postal: '51100',
        commune: 'Reims',
        voie: '12 BIS RUE DE LECLERCQ'
      }),
      services: Services([Service.AccederADuMateriel]),
      date_maj: new Date('2022-10-10'),
      localisation: Localisation({
        latitude,
        longitude
      })
    };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of([lieuMediationNumerique])
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriquePresentation: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION))
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriquePresentation).toStrictEqual([
      {
        id: 'structure-1',
        nom: 'Anonymal',
        code_postal: '51100',
        commune: 'Reims',
        date_maj: new Date('2022-10-10'),
        latitude,
        longitude,
        services: [Service.AccederADuMateriel],
        voie: '12 BIS RUE DE LECLERCQ'
      }
    ]);
  });

  it('should sort lieux mediation numerique by distance', async (): Promise<void> => {
    const lieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({ latitude: 46.2814605, longitude: 4.468874 })
      },
      {
        id: Id('structure-2'),
        nom: Nom('Médiation Numérique Lyonnaise'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '69004',
          commune: 'Lyon',
          voie: '18 rue Robert Galley'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({ latitude: 45.7689958, longitude: 4.8343466 })
      }
    ];

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(lieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriqueByDistance: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(
        of(
          Localisation({
            latitude: 45.7560246,
            longitude: 4.79603
          })
        )
      )
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriqueByDistance).toStrictEqual([
      {
        id: 'structure-2',
        nom: 'Médiation Numérique Lyonnaise',
        code_postal: '69004',
        commune: 'Lyon',
        date_maj: new Date('2022-10-10'),
        latitude: 45.7689958,
        longitude: 4.8343466,
        services: [Service.AccederADuMateriel],
        voie: '18 rue Robert Galley',
        distance: 3303.8115461567304
      },
      {
        id: 'structure-1',
        nom: 'Anonymal',
        code_postal: '51100',
        commune: 'Reims',
        date_maj: new Date('2022-10-10'),
        latitude: 46.2814605,
        longitude: 4.468874,
        services: [Service.AccederADuMateriel],
        voie: '12 BIS RUE DE LECLERCQ',
        distance: 63653.064922230085
      }
    ]);
  });

  it('should filter lieux mediation numerique on service property', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ'
        }),
        date_maj: new Date('2022-10-10'),
        services: Services([Service.RealiserDesDemarchesAdministratives]),
        localisation: Localisation({ latitude: 46.2814605, longitude: 4.468874 })
      },
      {
        id: Id('structure-2'),
        nom: Nom('Médiation Numérique Lyonnaise'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '69004',
          commune: 'Lyon',
          voie: '18 rue Robert Galley'
        }),
        date_maj: new Date('2022-10-10'),
        services: Services([Service.CreerEtDevelopperMonEntreprise]),
        localisation: Localisation({ latitude: 45.7689958, longitude: 4.8343466 })
      }
    ];

    const filter: FilterPresentation = { service: Service.CreerEtDevelopperMonEntreprise };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriquePresentation: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION), of(filter))
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriquePresentation).toStrictEqual([
      {
        id: 'structure-2',
        nom: 'Médiation Numérique Lyonnaise',
        code_postal: '69004',
        commune: 'Lyon',
        date_maj: new Date('2022-10-10'),
        services: [Service.CreerEtDevelopperMonEntreprise],
        voie: '18 rue Robert Galley',
        latitude: 45.7689958,
        longitude: 4.8343466
      }
    ]);
  });

  it('should filter lieux mediation numerique on distance property', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({
          latitude: 47,
          longitude: 5
        })
      },
      {
        id: Id('structure-2'),
        nom: Nom('Médiation Numérique Lyonnaise'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '69004',
          commune: 'Lyon',
          voie: '18 rue Robert Galley'
        }),
        date_maj: new Date('2022-10-10'),
        services: Services([Service.AccederADuMateriel]),
        localisation: Localisation({
          latitude: 46,
          longitude: 4
        })
      }
    ];

    const filter: FilterPresentation = { distance: 5000 };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriquePresentation: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(
        of(
          Localisation({
            latitude: 46.035,
            longitude: 4.035
          })
        ),
        of(filter)
      )
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriquePresentation).toStrictEqual([
      {
        id: 'structure-2',
        nom: 'Médiation Numérique Lyonnaise',
        code_postal: '69004',
        commune: 'Lyon',
        date_maj: new Date('2022-10-10'),
        services: [Service.AccederADuMateriel],
        voie: '18 rue Robert Galley',
        distance: 4738.19581538169,
        latitude: 46,
        longitude: 4
      }
    ]);
  });

  it('should filter lieux mediation numerique on accessibilite property', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        accessibilite: Url(
          'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/'
        ),
        localisation: Localisation({ latitude: 46.2814605, longitude: 4.468874 })
      },
      {
        id: Id('structure-2'),
        nom: Nom('Médiation Numérique Lyonnaise'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '69004',
          commune: 'Lyon',
          voie: '18 rue Robert Galley'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({ latitude: 45.7689958, longitude: 4.8343466 })
      }
    ];

    const filter: FilterPresentation = { accessibilite: true };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriquePresentation: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION), of(filter))
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriquePresentation).toStrictEqual([
      {
        id: 'structure-1',
        nom: 'Anonymal',
        code_postal: '51100',
        commune: 'Reims',
        date_maj: new Date('2022-10-10'),
        services: [Service.AccederADuMateriel],
        voie: '12 BIS RUE DE LECLERCQ',
        accessibilite:
          'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/',
        latitude: 46.2814605,
        longitude: 4.468874
      }
    ]);
  });

  it('should not filter lieux mediation numerique on accessibilite property', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        accessibilite: Url(
          'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/'
        ),
        localisation: Localisation({ latitude: 46.2814605, longitude: 4.468874 })
      },
      {
        id: Id('structure-2'),
        nom: Nom('Médiation Numérique Lyonnaise'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '69004',
          commune: 'Lyon',
          voie: '18 rue Robert Galley'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({ latitude: 45.7689958, longitude: 4.8343466 })
      }
    ];

    const filter: FilterPresentation = { accessibilite: false };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriquePresentation: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION), of(filter))
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriquePresentation).toStrictEqual([
      {
        id: 'structure-1',
        nom: 'Anonymal',
        code_postal: '51100',
        commune: 'Reims',
        voie: '12 BIS RUE DE LECLERCQ',
        services: [Service.AccederADuMateriel],
        date_maj: new Date('2022-10-10'),
        accessibilite:
          'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/',
        latitude: 46.2814605,
        longitude: 4.468874
      },
      {
        id: 'structure-2',
        nom: 'Médiation Numérique Lyonnaise',
        code_postal: '69004',
        commune: 'Lyon',
        voie: '18 rue Robert Galley',
        services: [Service.AccederADuMateriel],
        date_maj: new Date('2022-10-10'),
        latitude: 45.7689958,
        longitude: 4.8343466
      }
    ]);
  });

  it('should filter lieux mediation numerique on prise RDV property', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ'
        }),
        date_maj: new Date('2022-10-10'),
        services: Services([Service.RealiserDesDemarchesAdministratives]),
        localisation: Localisation({ latitude: 46.2814605, longitude: 4.468874 }),
        prise_rdv: Url('https://www.rdv-aide-numerique.fr/book/6331a826ac7aea06f2f9eb63')
      },
      {
        id: Id('structure-2'),
        nom: Nom('Médiation Numérique Lyonnaise'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '69004',
          commune: 'Lyon',
          voie: '18 rue Robert Galley'
        }),
        date_maj: new Date('2022-10-10'),
        services: Services([Service.CreerEtDevelopperMonEntreprise]),
        localisation: Localisation({ latitude: 45.7689958, longitude: 4.8343466 })
      }
    ];

    const filter: FilterPresentation = { prise_rdv: true };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriquePresentation: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION), of(filter))
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriquePresentation).toStrictEqual([
      {
        id: 'structure-1',
        nom: 'Anonymal',
        code_postal: '51100',
        commune: 'Reims',
        date_maj: new Date('2022-10-10'),
        services: [Service.RealiserDesDemarchesAdministratives],
        voie: '12 BIS RUE DE LECLERCQ',
        latitude: 46.2814605,
        longitude: 4.468874,
        prise_rdv: 'https://www.rdv-aide-numerique.fr/book/6331a826ac7aea06f2f9eb63'
      }
    ]);
  });

  it('should not filter lieux mediation numerique on prise RDV property', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({ latitude: 46.2814605, longitude: 4.468874 }),
        prise_rdv: Url('https://www.rdv-aide-numerique.fr/book/6331a826ac7aea06f2f9eb63')
      },
      {
        id: Id('structure-2'),
        nom: Nom('Médiation Numérique Lyonnaise'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '69004',
          commune: 'Lyon',
          voie: '18 rue Robert Galley'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({ latitude: 45.7689958, longitude: 4.8343466 })
      }
    ];

    const filter: FilterPresentation = { prise_rdv: false };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriquePresentation: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION), of(filter))
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriquePresentation).toStrictEqual([
      {
        id: 'structure-1',
        nom: 'Anonymal',
        code_postal: '51100',
        commune: 'Reims',
        voie: '12 BIS RUE DE LECLERCQ',
        services: [Service.AccederADuMateriel],
        date_maj: new Date('2022-10-10'),
        latitude: 46.2814605,
        longitude: 4.468874,
        prise_rdv: 'https://www.rdv-aide-numerique.fr/book/6331a826ac7aea06f2f9eb63'
      },
      {
        id: 'structure-2',
        nom: 'Médiation Numérique Lyonnaise',
        code_postal: '69004',
        commune: 'Lyon',
        voie: '18 rue Robert Galley',
        services: [Service.AccederADuMateriel],
        date_maj: new Date('2022-10-10'),
        latitude: 45.7689958,
        longitude: 4.8343466
      }
    ]);
  });

  it('should not filter lieux mediation numerique on conditions_access property when filter is empty', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({ latitude: 46.2814605, longitude: 4.468874 })
      },
      {
        id: Id('structure-2'),
        nom: Nom('Médiation Numérique Lyonnaise'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '69004',
          commune: 'Lyon',
          voie: '18 rue Robert Galley'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        conditions_acces: ConditionsAcces([ConditionAcces.Gratuit, ConditionAcces.GratuitSousCondition]),
        localisation: Localisation({ latitude: 45.7689958, longitude: 4.8343466 })
      }
    ];

    const filter: FilterPresentation = { conditions_acces: ConditionsAcces([]) };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriquePresentation: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION), of(filter))
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriquePresentation).toStrictEqual([
      {
        id: 'structure-1',
        nom: 'Anonymal',
        code_postal: '51100',
        commune: 'Reims',
        voie: '12 BIS RUE DE LECLERCQ',
        services: [Service.AccederADuMateriel],
        date_maj: new Date('2022-10-10'),
        latitude: 46.2814605,
        longitude: 4.468874
      },
      {
        id: 'structure-2',
        nom: 'Médiation Numérique Lyonnaise',
        code_postal: '69004',
        commune: 'Lyon',
        voie: '18 rue Robert Galley',
        services: [Service.AccederADuMateriel],
        date_maj: new Date('2022-10-10'),
        conditions_acces: [ConditionAcces.Gratuit, ConditionAcces.GratuitSousCondition],
        latitude: 45.7689958,
        longitude: 4.8343466
      }
    ]);
  });

  it('should filter lieux mediation numerique on conditions_access property', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({ latitude: 46.2814605, longitude: 4.468874 })
      },
      {
        id: Id('structure-2'),
        nom: Nom('Médiation Numérique Lyonnaise'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '69004',
          commune: 'Lyon',
          voie: '18 rue Robert Galley'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        conditions_acces: ConditionsAcces([ConditionAcces.Gratuit, ConditionAcces.GratuitSousCondition]),
        localisation: Localisation({ latitude: 45.7689958, longitude: 4.8343466 })
      }
    ];

    const filter: FilterPresentation = {
      conditions_acces: ConditionsAcces([ConditionAcces.Gratuit, ConditionAcces.GratuitSousCondition])
    };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriquePresentation: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION), of(filter))
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriquePresentation).toStrictEqual([
      {
        id: 'structure-2',
        nom: 'Médiation Numérique Lyonnaise',
        code_postal: '69004',
        commune: 'Lyon',
        voie: '18 rue Robert Galley',
        services: [Service.AccederADuMateriel],
        date_maj: new Date('2022-10-10'),
        conditions_acces: [ConditionAcces.Gratuit, ConditionAcces.GratuitSousCondition],
        latitude: 45.7689958,
        longitude: 4.8343466
      }
    ]);
  });

  it('should not filter lieux mediation numerique on publics_accueillis property when filter is empty', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({ latitude: 46.2814605, longitude: 4.468874 })
      },
      {
        id: Id('structure-2'),
        nom: Nom('Médiation Numérique Lyonnaise'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '69004',
          commune: 'Lyon',
          voie: '18 rue Robert Galley'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        publics_accueillis: PublicsAccueillis([PublicAccueilli.Adultes, PublicAccueilli.Surdite]),
        localisation: Localisation({ latitude: 45.7689958, longitude: 4.8343466 })
      }
    ];

    const filter: FilterPresentation = { publics_accueillis: PublicsAccueillis([]) };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriquePresentation: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION), of(filter))
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriquePresentation).toStrictEqual([
      {
        id: 'structure-1',
        nom: 'Anonymal',
        code_postal: '51100',
        commune: 'Reims',
        voie: '12 BIS RUE DE LECLERCQ',
        services: [Service.AccederADuMateriel],
        date_maj: new Date('2022-10-10'),
        latitude: 46.2814605,
        longitude: 4.468874
      },
      {
        id: 'structure-2',
        nom: 'Médiation Numérique Lyonnaise',
        code_postal: '69004',
        commune: 'Lyon',
        voie: '18 rue Robert Galley',
        services: [Service.AccederADuMateriel],
        date_maj: new Date('2022-10-10'),
        publics_accueillis: [PublicAccueilli.Adultes, PublicAccueilli.Surdite],
        latitude: 45.7689958,
        longitude: 4.8343466
      }
    ]);
  });

  it('should filter lieux mediation numerique on publics_accueillis that do not contains Adultes property', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({ latitude: 46.2814605, longitude: 4.468874 })
      },
      {
        id: Id('structure-2'),
        nom: Nom('Médiation Numérique Lyonnaise'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '69004',
          commune: 'Lyon',
          voie: '18 rue Robert Galley'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        publics_accueillis: PublicsAccueillis([PublicAccueilli.Adultes]),
        localisation: Localisation({ latitude: 45.7689958, longitude: 4.8343466 })
      }
    ];

    const filter: FilterPresentation = {
      publics_accueillis: PublicsAccueillis([PublicAccueilli.Adultes])
    };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumerique: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      new LieuxMediationNumeriquePresenter(lieuxMediationNumeriqueRepository).lieuxMediationNumeriqueByDistance$(
        of(NO_LOCALISATION),
        of(filter)
      )
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumerique).toStrictEqual([
      {
        id: 'structure-2',
        nom: 'Médiation Numérique Lyonnaise',
        code_postal: '69004',
        commune: 'Lyon',
        voie: '18 rue Robert Galley',
        services: [Service.AccederADuMateriel],
        date_maj: new Date('2022-10-10'),
        publics_accueillis: [PublicAccueilli.Adultes],
        latitude: 45.7689958,
        longitude: 4.8343466
      }
    ]);
  });

  it('should filter lieux mediation numerique on publics_accueillis that do not contains Adultes and Surdité properties', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        publics_accueillis: PublicsAccueillis([PublicAccueilli.Adultes]),
        localisation: Localisation({ latitude: 46.2814605, longitude: 4.468874 })
      },
      {
        id: Id('structure-2'),
        nom: Nom('Médiation Numérique Lyonnaise'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '69004',
          commune: 'Lyon',
          voie: '18 rue Robert Galley'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        publics_accueillis: PublicsAccueillis([PublicAccueilli.Adultes, PublicAccueilli.Surdite]),
        localisation: Localisation({ latitude: 45.7689958, longitude: 4.8343466 })
      }
    ];

    const filter: FilterPresentation = {
      publics_accueillis: PublicsAccueillis([PublicAccueilli.Adultes, PublicAccueilli.Surdite])
    };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumerique: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      new LieuxMediationNumeriquePresenter(lieuxMediationNumeriqueRepository).lieuxMediationNumeriqueByDistance$(
        of(NO_LOCALISATION),
        of(filter)
      )
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumerique).toStrictEqual([
      {
        id: 'structure-2',
        nom: 'Médiation Numérique Lyonnaise',
        code_postal: '69004',
        commune: 'Lyon',
        voie: '18 rue Robert Galley',
        services: [Service.AccederADuMateriel],
        date_maj: new Date('2022-10-10'),
        publics_accueillis: [PublicAccueilli.Adultes, PublicAccueilli.Surdite],
        latitude: 45.7689958,
        longitude: 4.8343466
      }
    ]);
  });

  it('should not filter lieux mediation numerique on modalites_accompagnement property when filter is empty', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({ latitude: 46.2814605, longitude: 4.468874 })
      },
      {
        id: Id('structure-2'),
        nom: Nom('Médiation Numérique Lyonnaise'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '69004',
          commune: 'Lyon',
          voie: '18 rue Robert Galley'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        modalites_accompagnement: ModalitesAccompagnement([ModaliteAccompagnement.Seul, ModaliteAccompagnement.AvecDeLAide]),
        localisation: Localisation({ latitude: 45.7689958, longitude: 4.8343466 })
      }
    ];

    const filter: FilterPresentation = { modalites_accompagnement: ModalitesAccompagnement([]) };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriquePresentation: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION), of(filter))
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriquePresentation).toStrictEqual([
      {
        id: 'structure-1',
        nom: 'Anonymal',
        code_postal: '51100',
        commune: 'Reims',
        voie: '12 BIS RUE DE LECLERCQ',
        services: [Service.AccederADuMateriel],
        date_maj: new Date('2022-10-10'),
        latitude: 46.2814605,
        longitude: 4.468874
      },
      {
        id: 'structure-2',
        nom: 'Médiation Numérique Lyonnaise',
        code_postal: '69004',
        commune: 'Lyon',
        voie: '18 rue Robert Galley',
        services: [Service.AccederADuMateriel],
        date_maj: new Date('2022-10-10'),
        modalites_accompagnement: [ModaliteAccompagnement.Seul, ModaliteAccompagnement.AvecDeLAide],
        latitude: 45.7689958,
        longitude: 4.8343466
      }
    ]);
  });

  it('should filter lieux mediation numerique on modalites_accompagnement property', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({ latitude: 46.2814605, longitude: 4.468874 })
      },
      {
        id: Id('structure-2'),
        nom: Nom('Médiation Numérique Lyonnaise'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '69004',
          commune: 'Lyon',
          voie: '18 rue Robert Galley'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        modalites_accompagnement: ModalitesAccompagnement([ModaliteAccompagnement.Seul, ModaliteAccompagnement.AvecDeLAide]),
        localisation: Localisation({ latitude: 45.7689958, longitude: 4.8343466 })
      }
    ];

    const filter: FilterPresentation = {
      modalites_accompagnement: ModalitesAccompagnement([ModaliteAccompagnement.Seul, ModaliteAccompagnement.AvecDeLAide])
    };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriquePresentation: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION), of(filter))
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriquePresentation).toStrictEqual([
      {
        id: 'structure-2',
        nom: 'Médiation Numérique Lyonnaise',
        code_postal: '69004',
        commune: 'Lyon',
        voie: '18 rue Robert Galley',
        services: [Service.AccederADuMateriel],
        date_maj: new Date('2022-10-10'),
        modalites_accompagnement: [ModaliteAccompagnement.Seul, ModaliteAccompagnement.AvecDeLAide],
        latitude: 45.7689958,
        longitude: 4.8343466
      }
    ]);
  });

  it('should not filter lieux mediation numerique on horaires_ouverture property when filter is empty', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({ latitude: 46.2814605, longitude: 4.468874 })
      },
      {
        id: Id('structure-2'),
        nom: Nom('Médiation Numérique Lyonnaise'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '69004',
          commune: 'Lyon',
          voie: '18 rue Robert Galley'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        horaires: 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
        localisation: Localisation({ latitude: 45.7689958, longitude: 4.8343466 })
      }
    ];

    const filter: FilterPresentation = { modalites_accompagnement: ModalitesAccompagnement([]) };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriquePresentation: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(
        of(NO_LOCALISATION),
        of(filter),
        new Date('2022-07-22T14:30:00.000Z')
      )
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriquePresentation).toStrictEqual([
      {
        id: 'structure-1',
        nom: 'Anonymal',
        code_postal: '51100',
        commune: 'Reims',
        voie: '12 BIS RUE DE LECLERCQ',
        services: [Service.AccederADuMateriel],
        date_maj: new Date('2022-10-10'),
        latitude: 46.2814605,
        longitude: 4.468874
      },
      {
        id: 'structure-2',
        nom: 'Médiation Numérique Lyonnaise',
        code_postal: '69004',
        commune: 'Lyon',
        voie: '18 rue Robert Galley',
        services: [Service.AccederADuMateriel],
        date_maj: new Date('2022-10-10'),
        horaires: 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
        latitude: 45.7689958,
        longitude: 4.8343466
      }
    ]);
  });

  it('should filter lieux mediation numerique on horaires_ouverture property opens on monday between 10:00 and 10:30', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({ latitude: 46.2814605, longitude: 4.468874 })
      },
      {
        id: Id('structure-2'),
        nom: Nom('Médiation Numérique Lyonnaise'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '69004',
          commune: 'Lyon',
          voie: '18 rue Robert Galley'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        horaires: 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
        localisation: Localisation({ latitude: 45.7689958, longitude: 4.8343466 })
      }
    ];

    const filter: FilterPresentation = {
      horaires_ouverture: [
        {
          day: 'mo',
          period: 'hours',
          start: '10:00',
          end: '10:30'
        }
      ]
    };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriquePresentation: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(
        of(NO_LOCALISATION),
        of(filter),
        new Date('2022-07-22T14:30:00.000Z')
      )
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriquePresentation).toStrictEqual([
      {
        id: 'structure-2',
        nom: 'Médiation Numérique Lyonnaise',
        code_postal: '69004',
        commune: 'Lyon',
        voie: '18 rue Robert Galley',
        services: [Service.AccederADuMateriel],
        date_maj: new Date('2022-10-10'),
        horaires: 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
        latitude: 45.7689958,
        longitude: 4.8343466
      }
    ]);
  });

  it('should filter lieux mediation numerique on horaires_ouverture property opens on sunday between 12:00 and 13:00', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: Id('structure-2'),
        nom: Nom('Médiation Numérique Lyonnaise'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '69004',
          commune: 'Lyon',
          voie: '18 rue Robert Galley'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        horaires: 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
        localisation: Localisation({ latitude: 45.7689958, longitude: 4.8343466 })
      }
    ];

    const filter: FilterPresentation = {
      horaires_ouverture: [
        {
          day: 'su',
          period: 'hours',
          start: '12:00',
          end: '13:00'
        }
      ]
    };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriquePresentation: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(
        of(NO_LOCALISATION),
        of(filter),
        new Date('2022-07-22T14:30:00.000Z')
      )
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriquePresentation).toStrictEqual([]);
  });

  it('should filter lieux mediation numerique on horaires_ouverture property opens any day between 10:00 and 10:30', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({ latitude: 46.2814605, longitude: 4.468874 })
      },
      {
        id: Id('structure-2'),
        nom: Nom('Médiation Numérique Lyonnaise'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '69004',
          commune: 'Lyon',
          voie: '18 rue Robert Galley'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        horaires: 'Tu-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
        localisation: Localisation({ latitude: 45.7689958, longitude: 4.8343466 })
      }
    ];

    const filter: FilterPresentation = {
      horaires_ouverture: [
        {
          day: 'all',
          period: 'hours',
          start: '10:00',
          end: '10:30'
        }
      ]
    };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriquePresentation: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(
        of(NO_LOCALISATION),
        of(filter),
        new Date('2022-07-22T14:30:00.000Z')
      )
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriquePresentation).toStrictEqual([
      {
        id: 'structure-2',
        nom: 'Médiation Numérique Lyonnaise',
        code_postal: '69004',
        commune: 'Lyon',
        voie: '18 rue Robert Galley',
        services: [Service.AccederADuMateriel],
        date_maj: new Date('2022-10-10'),
        horaires: 'Tu-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
        latitude: 45.7689958,
        longitude: 4.8343466
      }
    ]);
  });

  it('should filter lieux mediation numerique on horaires_ouverture property opens any day any time', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({ latitude: 46.2814605, longitude: 4.468874 })
      },
      {
        id: Id('structure-2'),
        nom: Nom('Médiation Numérique Lyonnaise'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '69004',
          commune: 'Lyon',
          voie: '18 rue Robert Galley'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        horaires: 'Tu-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
        localisation: Localisation({ latitude: 45.7689958, longitude: 4.8343466 })
      }
    ];

    const filter: FilterPresentation = {
      horaires_ouverture: [
        {
          day: 'all',
          period: 'all'
        }
      ]
    };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriquePresentation: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(
        of(NO_LOCALISATION),
        of(filter),
        new Date('2022-07-22T14:30:00.000Z')
      )
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriquePresentation).toStrictEqual([
      {
        id: 'structure-2',
        nom: 'Médiation Numérique Lyonnaise',
        code_postal: '69004',
        commune: 'Lyon',
        voie: '18 rue Robert Galley',
        services: [Service.AccederADuMateriel],
        date_maj: new Date('2022-10-10'),
        horaires: 'Tu-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
        latitude: 45.7689958,
        longitude: 4.8343466
      }
    ]);
  });

  it('should filter lieux mediation numerique on horaires_ouverture property set to open now', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        horaires: 'Mo-Th 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
        localisation: Localisation({ latitude: 46.2814605, longitude: 4.468874 })
      },
      {
        id: Id('structure-2'),
        nom: Nom('Médiation Numérique Lyonnaise'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '69004',
          commune: 'Lyon',
          voie: '18 rue Robert Galley'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        horaires: 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
        localisation: Localisation({ latitude: 45.7689958, longitude: 4.8343466 })
      }
    ];

    const filter: FilterPresentation = { horaires_ouverture: [{ day: 'now' }] };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriquePresentation: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(
        of(NO_LOCALISATION),
        of(filter),
        new Date('2022-07-22T14:30:00.000Z')
      )
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriquePresentation).toStrictEqual([
      {
        id: 'structure-2',
        nom: 'Médiation Numérique Lyonnaise',
        code_postal: '69004',
        commune: 'Lyon',
        voie: '18 rue Robert Galley',
        services: [Service.AccederADuMateriel],
        date_maj: new Date('2022-10-10'),
        horaires: 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
        latitude: 45.7689958,
        longitude: 4.8343466
      }
    ]);
  });

  it('should filter lieux mediation numerique on horaires_ouverture property and omit wrong OSM formats', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({ latitude: 46.2814605, longitude: 4.468874 })
      },
      {
        id: Id('structure-2'),
        nom: Nom('Médiation Numérique Lyonnaise'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '69004',
          commune: 'Lyon',
          voie: '18 rue Robert Galley'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        horaires: 'Mo-Fr 09:00,14:00-18:30; Sa 08:30-12:00',
        localisation: Localisation({ latitude: 45.7689958, longitude: 4.8343466 })
      }
    ];

    const filter: FilterPresentation = { horaires_ouverture: [] };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriquePresentation: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(
        of(NO_LOCALISATION),
        of(filter),
        new Date('2022-07-22T09:55:00.000Z')
      )
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriquePresentation).toStrictEqual([
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        code_postal: '51100',
        commune: 'Reims',
        voie: '12 BIS RUE DE LECLERCQ',
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        latitude: 46.2814605,
        longitude: 4.468874
      },
      {
        id: Id('structure-2'),
        nom: Nom('Médiation Numérique Lyonnaise'),
        code_postal: '69004',
        commune: 'Lyon',
        voie: '18 rue Robert Galley',
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        horaires: 'Mo-Fr 09:00,14:00-18:30; Sa 08:30-12:00',
        latitude: 45.7689958,
        longitude: 4.8343466
      }
    ]);
  });

  it('should not filter lieux mediation numerique when filter is null', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({ latitude: 46.2814605, longitude: 4.468874 })
      },
      {
        id: Id('structure-2'),
        nom: Nom('Médiation Numérique Lyonnaise'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '69004',
          commune: 'Lyon',
          voie: '18 rue Robert Galley'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({ latitude: 45.7689958, longitude: 4.8343466 })
      }
    ];

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriquePresentation: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION))
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriquePresentation).toStrictEqual([
      {
        id: 'structure-1',
        nom: 'Anonymal',
        code_postal: '51100',
        commune: 'Reims',
        voie: '12 BIS RUE DE LECLERCQ',
        services: [Service.AccederADuMateriel],
        date_maj: new Date('2022-10-10'),
        latitude: 46.2814605,
        longitude: 4.468874
      },
      {
        id: 'structure-2',
        nom: 'Médiation Numérique Lyonnaise',
        code_postal: '69004',
        commune: 'Lyon',
        voie: '18 rue Robert Galley',
        services: [Service.AccederADuMateriel],
        date_maj: new Date('2022-10-10'),
        latitude: 45.7689958,
        longitude: 4.8343466
      }
    ]);
  });

  it('should not filter lieux mediation numerique without location', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10')
      }
    ];

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriquePresentation: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION))
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriquePresentation).toStrictEqual([]);
  });

  it('should filter lieux mediation numerique on localisation according to bounding box localisations', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({ latitude: 47.25, longitude: 4.38 })
      },
      {
        id: Id('structure-2'),
        nom: Nom('Médiation Numérique Lyonnaise'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '69004',
          commune: 'Lyon',
          voie: '18 rue Robert Galley'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({ latitude: 41.16, longitude: 4.22 })
      },
      {
        id: Id('structure-3'),
        nom: Nom('Les bidouilleurs'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '75006',
          commune: 'Paris',
          voie: '13 rue cassette'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({ latitude: 46.56, longitude: 3.19 })
      },
      {
        id: Id('structure-4'),
        nom: Nom('Accès num'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '69210',
          commune: "L'Arbresle",
          voie: '12 rue de la rRpublique'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({ latitude: 46.73, longitude: 5.61 })
      },
      {
        id: Id('structure-5'),
        nom: Nom('Aide à caractère informatique'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '69006',
          commune: 'Lyon',
          voie: '126 Boulevard des Minimes'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({ latitude: 40.45, longitude: 3.62 })
      },
      {
        id: Id('structure-6'),
        nom: Nom('Les numériciens du vieux port'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '13001',
          commune: 'Marseille',
          voie: '3 impasse d vieux port'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({ latitude: 46.46, longitude: 4.78 })
      }
    ];

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriquePresentation: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(
        of(NO_LOCALISATION),
        of({}),
        undefined,
        of([Localisation({ latitude: 47, longitude: 4 }), Localisation({ latitude: 46, longitude: 5 })])
      )
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriquePresentation).toStrictEqual([
      {
        id: 'structure-6',
        nom: 'Les numériciens du vieux port',
        voie: '3 impasse d vieux port',
        code_postal: '13001',
        commune: 'Marseille',
        date_maj: new Date('2022-10-10'),
        latitude: 46.46,
        longitude: 4.78,
        services: ['Accéder à du matériel']
      }
    ]);
  });

  it('should filter all lieux mediation numerique when zoom level is too low', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: Id('structure-1'),
        nom: Nom('Anonymal'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '51100',
          commune: 'Reims',
          voie: '12 BIS RUE DE LECLERCQ'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({ latitude: 47.25, longitude: 4.38 })
      },
      {
        id: Id('structure-2'),
        nom: Nom('Médiation Numérique Lyonnaise'),
        pivot: Pivot('43493312300029'),
        adresse: Adresse({
          code_postal: '69004',
          commune: 'Lyon',
          voie: '18 rue Robert Galley'
        }),
        services: Services([Service.AccederADuMateriel]),
        date_maj: new Date('2022-10-10'),
        localisation: Localisation({ latitude: 41.16, longitude: 4.22 })
      }
    ];

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriquePresentation: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(
        of(NO_LOCALISATION),
        of({}),
        undefined,
        of([Localisation({ latitude: 47, longitude: 4 }), Localisation({ latitude: 46, longitude: 5 })]),
        of(5)
      )
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriquePresentation).toStrictEqual([]);
  });

  it('should group lieux de mediation numerique by departement', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        adresse: { code_postal: '69210' } as Adresse,
        localisation: Localisation({ latitude: 46.2814605, longitude: 4.468874 })
      } as LieuMediationNumerique
    ];

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const departementPresentations: DepartementPresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDepartement$(of(NO_LOCALISATION), of({}), undefined)
    );

    expect<DepartementPresentation[]>(departementPresentations).toStrictEqual([
      {
        code: '69',
        nom: 'Rhône',
        zoom: 9.3,
        lieuxCount: 1,
        localisation: {
          latitude: 45.871047330627775,
          longitude: 4.640949259558913
        }
      }
    ]);
  });

  it('should group lieux de mediation numerique by region', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        adresse: { code_postal: '69210' } as Adresse,
        localisation: Localisation({ latitude: 46.2814605, longitude: 4.468874 })
      } as LieuMediationNumerique
    ];

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const regionPresentations: RegionPresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByRegion$(of(NO_LOCALISATION), of({}), undefined)
    );

    expect<RegionPresentation[]>(regionPresentations).toStrictEqual([
      {
        code: '84',
        nom: 'Auvergne-Rhône-Alpes',
        zoom: 8,
        departements: ['01', '03', '07', '15', '26', '38', '42', '43', '63', '69', '73', '74'],
        lieuxCount: 1,
        localisation: {
          latitude: 45.515833,
          longitude: 4.538056
        },
        hub: {
          nom: 'Hinaura',
          source: 'hinaura',
          url: 'https://www.hinaura.fr/'
        }
      }
    ]);
  });
});

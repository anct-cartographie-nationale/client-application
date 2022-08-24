import { firstValueFrom, Observable, of } from 'rxjs';
import { LieuxMediationNumeriqueRepository } from '../../repositories';
import { Adresse, LieuMediationNumerique, Localisation, NO_LOCALISATION, Url } from '../../models';
import { FilterPresentation } from '../filter';
import { LieuMediationNumeriquePresentation } from './lieu-mediation-numerique.presentation';
import { LieuxMediationNumeriquePresenter } from './lieux-mediation-numerique.presenter';
import { DepartementPresentation, RegionPresentation } from '../collectivite-territoriale';

describe('lieux-mediation-numerique-list presenter', (): void => {
  it('should append the distance from some localisation to a lieu mediation numerique', async (): Promise<void> => {
    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> =>
        of([
          {
            localisation: Localisation({
              latitude: 46.2814605,
              longitude: 4.468874
            })
          } as LieuMediationNumerique
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
        localisation: Localisation({
          latitude: 46.2814605,
          longitude: 4.468874
        }),
        distance: 63586.94404350499
      }
    ]);
  });

  it('should not append the distance from some coordinates to a lieu mediation numerique when there is no coordinates', async (): Promise<void> => {
    const longitude: number = 4.8343466;
    const latitude: number = 45.7689958;

    const lieuMediationNumerique: LieuMediationNumerique = {
      localisation: Localisation({
        latitude,
        longitude
      })
    } as LieuMediationNumerique;

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of([lieuMediationNumerique])
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriquePresentation: LieuMediationNumerique[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION))
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriquePresentation).toStrictEqual([
      {
        localisation: Localisation({
          latitude,
          longitude
        })
      }
    ]);
  });

  it('should sort lieux mediation numerique by distance', async (): Promise<void> => {
    const lieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        localisation: Localisation({ latitude: 46.2814605, longitude: 4.468874 })
      } as LieuMediationNumerique,
      {
        localisation: Localisation({ latitude: 45.7689958, longitude: 4.8343466 })
      } as LieuMediationNumerique
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
        distance: 3303.8115461567304,
        localisation: {
          latitude: 45.7689958,
          longitude: 4.8343466
        }
      },
      {
        distance: 63653.064922230085,
        localisation: {
          latitude: 46.2814605,
          longitude: 4.468874
        }
      }
    ]);
  });

  it('should filter lieux mediation numerique on service property', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        services: ['Réaliser des démarches administratives avec un accompagnement']
      } as LieuMediationNumerique,
      {
        services: ['Créer et développer mon entreprise']
      } as LieuMediationNumerique
    ];

    const filter: FilterPresentation = { services: 'Créer et développer mon entreprise' };

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
        services: ['Créer et développer mon entreprise']
      }
    ]);
  });

  it('should filter lieux mediation numerique on distance property', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        localisation: Localisation({
          latitude: 47,
          longitude: 5
        })
      } as LieuMediationNumerique,
      {
        localisation: Localisation({
          latitude: 46,
          longitude: 4
        })
      } as LieuMediationNumerique
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
        distance: 4738.19581538169,
        localisation: {
          latitude: 46,
          longitude: 4
        }
      }
    ]);
  });

  it('should filter lieux mediation numerique on accessibilite property', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {} as LieuMediationNumerique,
      {
        accessibilite: Url(
          'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/'
        )
      } as LieuMediationNumerique
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
        accessibilite: Url(
          'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/'
        )
      }
    ]);
  });

  it('should not filter lieux mediation numerique on accessibilite property', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {} as LieuMediationNumerique,
      {
        accessibilite: Url(
          'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/'
        )
      } as LieuMediationNumerique
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
      {},
      {
        accessibilite: Url(
          'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/'
        )
      }
    ]);
  });

  it('should not filter lieux mediation numerique on conditions_access property when filter is empty', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {} as LieuMediationNumerique,
      {
        conditions_access: ['Gratuit', 'Gratuit sous condition']
      } as LieuMediationNumerique,
      {
        conditions_access: ['Gratuit']
      } as LieuMediationNumerique,
      {
        conditions_access: ['Gratuit sous condition']
      } as LieuMediationNumerique,
      {
        conditions_access: ['Payant']
      } as LieuMediationNumerique
    ];

    const filter: FilterPresentation = { conditions_access: [] };

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
      {},
      {
        conditions_access: ['Gratuit', 'Gratuit sous condition']
      },
      {
        conditions_access: ['Gratuit']
      },
      {
        conditions_access: ['Gratuit sous condition']
      },
      {
        conditions_access: ['Payant']
      }
    ]);
  });

  it('should filter lieux mediation numerique on conditions_access property', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {} as LieuMediationNumerique,
      {
        conditions_access: ['Gratuit', 'Gratuit sous condition']
      } as LieuMediationNumerique,
      {
        conditions_access: ['Gratuit']
      } as LieuMediationNumerique,
      {
        conditions_access: ['Gratuit sous condition']
      } as LieuMediationNumerique,
      {
        conditions_access: ['Payant']
      } as LieuMediationNumerique
    ];

    const filter: FilterPresentation = {
      conditions_access: ['Gratuit', 'Gratuit sous condition']
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
        conditions_access: ['Gratuit', 'Gratuit sous condition']
      },
      {
        conditions_access: ['Gratuit']
      },
      {
        conditions_access: ['Gratuit sous condition']
      }
    ]);
  });

  it('should not filter lieux mediation numerique on publics_accueillis property when filter is empty', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {} as LieuMediationNumerique,
      {
        publics_accueillis: ['Adultes', 'Surdité']
      } as LieuMediationNumerique,
      {
        publics_accueillis: ['Adultes']
      } as LieuMediationNumerique,
      {
        publics_accueillis: ['Surdité']
      } as LieuMediationNumerique,
      {
        publics_accueillis: ['Déficience visuelle']
      } as LieuMediationNumerique
    ];

    const filter: FilterPresentation = { publics_accueillis: [] };

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
      {},
      {
        publics_accueillis: ['Adultes', 'Surdité']
      },
      {
        publics_accueillis: ['Adultes']
      },
      {
        publics_accueillis: ['Surdité']
      },
      {
        publics_accueillis: ['Déficience visuelle']
      }
    ]);
  });

  it('should filter lieux mediation numerique on publics_accueillis property', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {} as LieuMediationNumerique,
      {
        publics_accueillis: ['Adultes', 'Surdité']
      } as LieuMediationNumerique,
      {
        publics_accueillis: ['Adultes']
      } as LieuMediationNumerique,
      {
        publics_accueillis: ['Surdité']
      } as LieuMediationNumerique,
      {
        publics_accueillis: ['Déficience visuelle']
      } as LieuMediationNumerique
    ];

    const filter: FilterPresentation = { publics_accueillis: ['Adultes', 'Surdité'] };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumerique: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION), of(filter))
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumerique).toStrictEqual([
      {
        publics_accueillis: ['Adultes', 'Surdité']
      },
      {
        publics_accueillis: ['Adultes']
      },
      {
        publics_accueillis: ['Surdité']
      }
    ]);
  });

  it('should not filter lieux mediation numerique on modalites_accompagnement property when filter is empty', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {} as LieuMediationNumerique,
      {
        modalites_accompagnement: ['Seul', "Avec de l'aide"]
      } as LieuMediationNumerique,
      {
        modalites_accompagnement: ['Seul']
      } as LieuMediationNumerique,
      {
        modalites_accompagnement: ["Avec de l'aide"]
      } as LieuMediationNumerique,
      {
        modalites_accompagnement: ['Dans un atelier']
      } as LieuMediationNumerique
    ];

    const filter: FilterPresentation = { modalites_accompagnement: [] };

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
      {},
      {
        modalites_accompagnement: ['Seul', "Avec de l'aide"]
      },
      {
        modalites_accompagnement: ['Seul']
      },
      {
        modalites_accompagnement: ["Avec de l'aide"]
      },
      {
        modalites_accompagnement: ['Dans un atelier']
      }
    ]);
  });

  it('should filter lieux mediation numerique on modalites_accompagnement property', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {} as LieuMediationNumerique,
      {
        modalites_accompagnement: ['Seul', "Avec de l'aide"]
      } as LieuMediationNumerique,
      {
        modalites_accompagnement: ['Seul']
      } as LieuMediationNumerique,
      {
        modalites_accompagnement: ["Avec de l'aide"]
      } as LieuMediationNumerique,
      {
        modalites_accompagnement: ['Dans un atelier']
      } as LieuMediationNumerique
    ];

    const filter: FilterPresentation = { modalites_accompagnement: ['Seul', "Avec de l'aide"] };

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
        modalites_accompagnement: ['Seul', "Avec de l'aide"]
      },
      {
        modalites_accompagnement: ['Seul']
      },
      {
        modalites_accompagnement: ["Avec de l'aide"]
      }
    ]);
  });

  it('should not filter lieux mediation numerique on date_ouverture property when filter is empty', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {} as LieuMediationNumerique,
      {
        horaires: 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00'
      } as LieuMediationNumerique,
      {
        horaires: 'Mo-Th 09:00-12:00,14:00-18:30; Sa 08:30-12:00'
      } as LieuMediationNumerique
    ];

    const filter: FilterPresentation = { modalites_accompagnement: [] };

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
      {},
      {
        horaires: 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
        status: 'Ouvert'
      },
      {
        horaires: 'Mo-Th 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
        status: 'Fermé'
      }
    ]);
  });

  it('should filter lieux mediation numerique on date_ouverture property', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {} as LieuMediationNumerique,
      {
        horaires: 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00'
      } as LieuMediationNumerique,
      {
        horaires: 'Mo-Th 09:00-12:00,14:00-18:30; Sa 08:30-12:00'
      } as LieuMediationNumerique
    ];

    const filter: FilterPresentation = { date_ouverture: '2022-07-22' };

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
        horaires: 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
        status: 'Ouvert'
      }
    ]);
  });

  it('should filter lieux mediation numerique on date_ouverture property and omit wrong OSM formats', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {} as LieuMediationNumerique,
      {
        horaires: 'Mo-Fr 09:00,14:00-18:30; Sa 08:30-12:00'
      } as LieuMediationNumerique,
      {
        horaires: 'Mo-Th 09:00-12:00,14:00-18:30; Sa 08:30-12:00'
      } as LieuMediationNumerique
    ];

    const filter: FilterPresentation = { date_ouverture: '2022-07-22' };

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

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriquePresentation).toStrictEqual([]);
  });

  it('should filter lieux mediation numerique on ouvert_actuellement property', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {} as LieuMediationNumerique,
      {
        horaires: 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00'
      } as LieuMediationNumerique,
      {
        horaires: 'Mo-Fr 09:00-12:00; Sa 08:30-12:00'
      } as LieuMediationNumerique,
      {
        horaires: 'Mo-Th 09:00-12:00,14:00-18:30; Sa 08:30-12:00'
      } as LieuMediationNumerique
    ];

    const filter: FilterPresentation = {
      date_ouverture: '2022-07-22',
      ouvert_actuellement: 'true'
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
        horaires: 'Mo-Fr 09:00-12:00,14:00-18:30; Sa 08:30-12:00',
        status: 'Ouvert'
      }
    ]);
  });

  it('should not filter lieux mediation numerique when filter is null', async (): Promise<void> => {
    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> =>
        of([{ id: '43493312300029' } as LieuMediationNumerique, { id: '78993312300029' } as LieuMediationNumerique])
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter = new LieuxMediationNumeriquePresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriquePresentation: LieuMediationNumeriquePresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION))
    );

    expect<LieuMediationNumeriquePresentation[]>(lieuxMediationNumeriquePresentation).toStrictEqual([
      {
        id: '43493312300029'
      } as LieuMediationNumerique,
      {
        id: '78993312300029'
      } as LieuMediationNumerique
    ]);
  });

  it('should filter lieux mediation numerique on localisation according to bounding box localisations', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        localisation: Localisation({ latitude: 47.25, longitude: 4.38 })
      } as LieuMediationNumerique,
      {
        localisation: Localisation({ latitude: 41.16, longitude: 4.22 })
      } as LieuMediationNumerique,
      {
        localisation: Localisation({ latitude: 46.56, longitude: 3.19 })
      } as LieuMediationNumerique,
      {
        localisation: Localisation({ latitude: 46.73, longitude: 5.61 })
      } as LieuMediationNumerique,
      {
        localisation: Localisation({ latitude: 40.45, longitude: 3.62 })
      } as LieuMediationNumerique,
      {
        localisation: Localisation({ latitude: 47.87, longitude: 5.96 })
      } as LieuMediationNumerique,
      {
        localisation: Localisation({ latitude: 46.46, longitude: 4.78 })
      } as LieuMediationNumerique
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
        localisation: {
          latitude: 46.46,
          longitude: 4.78
        }
      }
    ]);
  });

  it('should group lieux de mediation numerique by departement', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        adresse: Adresse({ code_postal: '69210' } as Adresse)
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
        zoom: 11,
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
        adresse: Adresse({ code_postal: '69210' } as Adresse)
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
        zoom: 9,
        departements: ['01', '03', '07', '15', '26', '38', '42', '43', '63', '69', '73', '74'],
        lieuxCount: 1,
        localisation: {
          latitude: 45.515833,
          longitude: 4.538056
        }
      }
    ]);
  });
});

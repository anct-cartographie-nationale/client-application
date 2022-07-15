import { LieuxMediationNumeriqueListPresenter } from './lieux-mediation-numerique-list.presenter';
import { firstValueFrom, Observable, of } from 'rxjs';
import { LieuxMediationNumeriqueRepository } from '../../repositories';
import { LieuMediationNumerique, Localisation, NO_LOCALISATION, Url } from '../../../../../models';
import { LieuMediationNumeriqueListItemPresentation } from './lieu-mediation-numerique-list-item.presentation';
import { FilterPresentation } from '../../../../orientation/domain/presenters/filter/filter.presenter';

describe('lieux-mediation-numerique-list presenter', (): void => {
  it('should append the distance from some localisation to a lieu mediation numerique', async (): Promise<void> => {
    const localisation: Localisation = Localisation({ latitude: 45.7689958, longitude: 4.8343466 });

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

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter = new LieuxMediationNumeriqueListPresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumerique: LieuMediationNumeriqueListItemPresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(localisation))
    );

    expect(lieuxMediationNumerique).toStrictEqual([
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

    const expectedLieuMediationNumerique: LieuMediationNumerique = {
      localisation: Localisation({
        latitude,
        longitude
      })
    } as LieuMediationNumerique;

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of([expectedLieuMediationNumerique])
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter = new LieuxMediationNumeriqueListPresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumerique: LieuMediationNumerique[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION))
    );

    expect(lieuxMediationNumerique).toStrictEqual([expectedLieuMediationNumerique]);
  });

  it('should sort lieux mediation numerique by distance', async (): Promise<void> => {
    const localisation: Localisation = Localisation({
      latitude: 45.7560246,
      longitude: 4.79603
    });

    const lieuxMediationNumerique: LieuMediationNumeriqueListItemPresentation[] = [
      {
        localisation: Localisation({ latitude: 46.2814605, longitude: 4.468874 })
      } as LieuMediationNumeriqueListItemPresentation,
      {
        localisation: Localisation({ latitude: 45.7689958, longitude: 4.8343466 })
      } as LieuMediationNumeriqueListItemPresentation
    ];

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(lieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter = new LieuxMediationNumeriqueListPresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumeriqueByDistance: LieuMediationNumeriqueListItemPresentation[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(localisation))
    );

    expect(lieuxMediationNumeriqueByDistance).toStrictEqual([
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
    const LieuxMediationNumerique: LieuMediationNumeriqueListItemPresentation[] = [
      {
        services: ['Réaliser des démarches administratives avec un accompagnement']
      } as LieuMediationNumeriqueListItemPresentation,
      {
        services: ['Créer et développer mon entreprise']
      } as LieuMediationNumeriqueListItemPresentation
    ];

    const filter: FilterPresentation = { services: 'Créer et développer mon entreprise' };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter = new LieuxMediationNumeriqueListPresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumerique: LieuMediationNumerique[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION), of(filter))
    );

    expect(lieuxMediationNumerique).toStrictEqual([
      {
        services: ['Créer et développer mon entreprise']
      }
    ]);
  });

  it('should filter lieux mediation numerique on distance property', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumeriqueListItemPresentation[] = [
      {
        distance: 357000
      } as LieuMediationNumeriqueListItemPresentation,
      {
        distance: 2500
      } as LieuMediationNumeriqueListItemPresentation
    ];

    const filter: FilterPresentation = { distance: 5000 };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter = new LieuxMediationNumeriqueListPresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumerique: LieuMediationNumerique[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION), of(filter))
    );

    expect(lieuxMediationNumerique).toStrictEqual([
      {
        distance: 2500
      }
    ]);
  });

  it('should filter lieux mediation numerique on accessibilite property', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumeriqueListItemPresentation[] = [
      {} as LieuMediationNumeriqueListItemPresentation,
      {
        accessibilite: Url(
          'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/'
        )
      } as LieuMediationNumeriqueListItemPresentation
    ];

    const filter: FilterPresentation = { accessibilite: true };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter = new LieuxMediationNumeriqueListPresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumerique: LieuMediationNumerique[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION), of(filter))
    );

    expect(lieuxMediationNumerique).toStrictEqual([
      {
        accessibilite: Url(
          'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/'
        )
      }
    ]);
  });

  it('should not filter lieux mediation numerique on accessibilite property', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumeriqueListItemPresentation[] = [
      {} as LieuMediationNumeriqueListItemPresentation,
      {
        accessibilite: Url(
          'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/'
        )
      } as LieuMediationNumeriqueListItemPresentation
    ];

    const filter: FilterPresentation = { accessibilite: false };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter = new LieuxMediationNumeriqueListPresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumerique: LieuMediationNumerique[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION), of(filter))
    );

    expect(lieuxMediationNumerique).toStrictEqual([
      {} as LieuMediationNumeriqueListItemPresentation,
      {
        accessibilite: Url(
          'https://acceslibre.beta.gouv.fr/app/29-lampaul-plouarzel/a/bibliotheque-mediatheque/erp/mediatheque-13/'
        )
      } as LieuMediationNumeriqueListItemPresentation
    ]);
  });

  it('should not filter lieux mediation numerique on conditions_access property when filter is empty', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumeriqueListItemPresentation[] = [
      {} as LieuMediationNumeriqueListItemPresentation,
      {
        conditions_access: ['Gratuit', 'Gratuit sous condition']
      } as LieuMediationNumeriqueListItemPresentation,
      {
        conditions_access: ['Gratuit']
      } as LieuMediationNumeriqueListItemPresentation,
      {
        conditions_access: ['Gratuit sous condition']
      } as LieuMediationNumeriqueListItemPresentation,
      {
        conditions_access: ['Payant']
      } as LieuMediationNumeriqueListItemPresentation
    ];

    const filter: FilterPresentation = { conditions_access: [] };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter = new LieuxMediationNumeriqueListPresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumerique: LieuMediationNumerique[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION), of(filter))
    );

    expect(lieuxMediationNumerique).toStrictEqual([
      {} as LieuMediationNumeriqueListItemPresentation,
      {
        conditions_access: ['Gratuit', 'Gratuit sous condition']
      } as LieuMediationNumeriqueListItemPresentation,
      {
        conditions_access: ['Gratuit']
      } as LieuMediationNumeriqueListItemPresentation,
      {
        conditions_access: ['Gratuit sous condition']
      } as LieuMediationNumeriqueListItemPresentation,
      {
        conditions_access: ['Payant']
      } as LieuMediationNumeriqueListItemPresentation
    ]);
  });

  it('should filter lieux mediation numerique on conditions_access property', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumeriqueListItemPresentation[] = [
      {} as LieuMediationNumeriqueListItemPresentation,
      {
        conditions_access: ['Gratuit', 'Gratuit sous condition']
      } as LieuMediationNumeriqueListItemPresentation,
      {
        conditions_access: ['Gratuit']
      } as LieuMediationNumeriqueListItemPresentation,
      {
        conditions_access: ['Gratuit sous condition']
      } as LieuMediationNumeriqueListItemPresentation,
      {
        conditions_access: ['Payant']
      } as LieuMediationNumeriqueListItemPresentation
    ];

    const filter: FilterPresentation = {
      conditions_access: ['Gratuit', 'Gratuit sous condition']
    };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter = new LieuxMediationNumeriqueListPresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumerique: LieuMediationNumerique[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION), of(filter))
    );

    expect(lieuxMediationNumerique).toStrictEqual([
      {
        conditions_access: ['Gratuit', 'Gratuit sous condition']
      } as LieuMediationNumeriqueListItemPresentation,
      {
        conditions_access: ['Gratuit']
      } as LieuMediationNumeriqueListItemPresentation,
      {
        conditions_access: ['Gratuit sous condition']
      } as LieuMediationNumeriqueListItemPresentation
    ]);
  });

  it('should not filter lieux mediation numerique on publics_accueillis property when filter is empty', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumeriqueListItemPresentation[] = [
      {} as LieuMediationNumeriqueListItemPresentation,
      {
        publics_accueillis: ['Adultes', 'Surdité']
      } as LieuMediationNumeriqueListItemPresentation,
      {
        publics_accueillis: ['Adultes']
      } as LieuMediationNumeriqueListItemPresentation,
      {
        publics_accueillis: ['Surdité']
      } as LieuMediationNumeriqueListItemPresentation,
      {
        publics_accueillis: ['Déficience visuelle']
      } as LieuMediationNumeriqueListItemPresentation
    ];

    const filter: FilterPresentation = { publics_accueillis: [] };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter = new LieuxMediationNumeriqueListPresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumerique: LieuMediationNumerique[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION), of(filter))
    );

    expect(lieuxMediationNumerique).toStrictEqual([
      {} as LieuMediationNumeriqueListItemPresentation,
      {
        publics_accueillis: ['Adultes', 'Surdité']
      } as LieuMediationNumeriqueListItemPresentation,
      {
        publics_accueillis: ['Adultes']
      } as LieuMediationNumeriqueListItemPresentation,
      {
        publics_accueillis: ['Surdité']
      } as LieuMediationNumeriqueListItemPresentation,
      {
        publics_accueillis: ['Déficience visuelle']
      } as LieuMediationNumeriqueListItemPresentation
    ]);
  });

  it('should filter lieux mediation numerique on publics_accueillis property', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumeriqueListItemPresentation[] = [
      {} as LieuMediationNumeriqueListItemPresentation,
      {
        publics_accueillis: ['Adultes', 'Surdité']
      } as LieuMediationNumeriqueListItemPresentation,
      {
        publics_accueillis: ['Adultes']
      } as LieuMediationNumeriqueListItemPresentation,
      {
        publics_accueillis: ['Surdité']
      } as LieuMediationNumeriqueListItemPresentation,
      {
        publics_accueillis: ['Déficience visuelle']
      } as LieuMediationNumeriqueListItemPresentation
    ];

    const filter: FilterPresentation = { publics_accueillis: ['Adultes', 'Surdité'] };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter = new LieuxMediationNumeriqueListPresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumerique: LieuMediationNumerique[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION), of(filter))
    );

    expect(lieuxMediationNumerique).toStrictEqual([
      {
        publics_accueillis: ['Adultes', 'Surdité']
      } as LieuMediationNumeriqueListItemPresentation,
      {
        publics_accueillis: ['Adultes']
      } as LieuMediationNumeriqueListItemPresentation,
      {
        publics_accueillis: ['Surdité']
      } as LieuMediationNumeriqueListItemPresentation
    ]);
  });

  it('should not filter lieux mediation numerique on modalites_accompagnement property when filter is empty', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumeriqueListItemPresentation[] = [
      {} as LieuMediationNumeriqueListItemPresentation,
      {
        modalites_accompagnement: ['Seul', "Avec de l'aide"]
      } as LieuMediationNumeriqueListItemPresentation,
      {
        modalites_accompagnement: ['Seul']
      } as LieuMediationNumeriqueListItemPresentation,
      {
        modalites_accompagnement: ["Avec de l'aide"]
      } as LieuMediationNumeriqueListItemPresentation,
      {
        modalites_accompagnement: ['Dans un atelier']
      } as LieuMediationNumeriqueListItemPresentation
    ];

    const filter: FilterPresentation = { modalites_accompagnement: [] };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter = new LieuxMediationNumeriqueListPresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumerique: LieuMediationNumerique[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION), of(filter))
    );

    expect(lieuxMediationNumerique).toStrictEqual([
      {} as LieuMediationNumeriqueListItemPresentation,
      {
        modalites_accompagnement: ['Seul', "Avec de l'aide"]
      } as LieuMediationNumeriqueListItemPresentation,
      {
        modalites_accompagnement: ['Seul']
      } as LieuMediationNumeriqueListItemPresentation,
      {
        modalites_accompagnement: ["Avec de l'aide"]
      } as LieuMediationNumeriqueListItemPresentation,
      {
        modalites_accompagnement: ['Dans un atelier']
      } as LieuMediationNumeriqueListItemPresentation
    ]);
  });

  it('should filter lieux mediation numerique on modalites_accompagnement property', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumeriqueListItemPresentation[] = [
      {} as LieuMediationNumeriqueListItemPresentation,
      {
        modalites_accompagnement: ['Seul', "Avec de l'aide"]
      } as LieuMediationNumeriqueListItemPresentation,
      {
        modalites_accompagnement: ['Seul']
      } as LieuMediationNumeriqueListItemPresentation,
      {
        modalites_accompagnement: ["Avec de l'aide"]
      } as LieuMediationNumeriqueListItemPresentation,
      {
        modalites_accompagnement: ['Dans un atelier']
      } as LieuMediationNumeriqueListItemPresentation
    ];

    const filter: FilterPresentation = { modalites_accompagnement: ['Seul', "Avec de l'aide"] };

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter = new LieuxMediationNumeriqueListPresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumerique: LieuMediationNumerique[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION), of(filter))
    );

    expect(lieuxMediationNumerique).toStrictEqual([
      {
        modalites_accompagnement: ['Seul', "Avec de l'aide"]
      } as LieuMediationNumeriqueListItemPresentation,
      {
        modalites_accompagnement: ['Seul']
      } as LieuMediationNumeriqueListItemPresentation,
      {
        modalites_accompagnement: ["Avec de l'aide"]
      } as LieuMediationNumeriqueListItemPresentation
    ]);
  });

  it('should not filter lieux mediation numerique when filter is null', async (): Promise<void> => {
    const expectedLieuMediationNumerique: LieuMediationNumerique[] = [
      {
        id: '43493312300029'
      } as LieuMediationNumerique,
      {
        id: '78993312300029'
      } as LieuMediationNumerique
    ];

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(expectedLieuMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter = new LieuxMediationNumeriqueListPresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumerique: LieuMediationNumerique[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION), of(undefined))
    );

    expect(lieuxMediationNumerique).toStrictEqual(expectedLieuMediationNumerique);
  });
});

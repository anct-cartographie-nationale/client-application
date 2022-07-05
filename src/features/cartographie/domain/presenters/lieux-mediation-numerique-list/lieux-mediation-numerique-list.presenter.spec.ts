import { LieuxMediationNumeriqueListPresenter } from './lieux-mediation-numerique-list.presenter';
import { firstValueFrom, Observable, of } from 'rxjs';
import { LieuxMediationNumeriqueRepository } from '../../repositories';
import { LieuMediationNumerique } from '../../../../../models/lieu-mediation-numerique/lieu-mediation-numerique';
import { Localisation, NO_LOCALISATION } from '../../../../../models/localisation/localisation';
import { LieuMediationNumeriqueListItemPresentation } from './lieu-mediation-numerique-list-item.presentation';

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

  // todo: Add distance
  it('should sort lieux mediation numerique by distance', async (): Promise<void> => {
    const localisation: Localisation = Localisation({
      latitude: 45.7560246,
      longitude: 4.79603
    });

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

  it('should filter lieux mediation numerique', async (): Promise<void> => {
    const LieuxMediationNumerique: LieuMediationNumerique[] = [
      {
        id: '43493312300029'
      } as LieuMediationNumerique,
      {
        id: '78993312300029'
      } as LieuMediationNumerique
    ];

    const expectedLieuMediationNumerique: LieuMediationNumerique = {
      id: '43493312300029'
    } as LieuMediationNumerique;

    const lieuxMediationNumeriqueRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<LieuMediationNumerique[]> => of(LieuxMediationNumerique)
    } as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter = new LieuxMediationNumeriqueListPresenter(
      lieuxMediationNumeriqueRepository
    );

    const lieuxMediationNumerique: LieuMediationNumerique[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION), of('43493312300029'))
    );

    expect(lieuxMediationNumerique).toStrictEqual([expectedLieuMediationNumerique]);
  });

  it('should not filter lieux mediation numerique when id is null', async (): Promise<void> => {
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
      lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION))
    );

    expect(lieuxMediationNumerique).toStrictEqual(expectedLieuMediationNumerique);
  });
});

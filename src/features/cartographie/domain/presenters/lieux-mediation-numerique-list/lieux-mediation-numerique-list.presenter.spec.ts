import { Structure } from '@gouvfr-anct/mediation-numerique';
import { LieuxMediationNumeriqueListPresenter } from './lieux-mediation-numerique-list.presenter';
import { firstValueFrom, Observable, of } from 'rxjs';
import { LieuxMediationNumeriqueRepository } from '../../repositories';
import { Coordinates, NO_COORDINATES } from '../../value-objects';

describe('lieux-mediation-numerique-list presenter', (): void => {
  it('should append the distance from some coordinates to a structure', async (): Promise<void> => {
    const longitude: number = 4.8343466;
    const latitude: number = 45.7689958;

    const structure: Structure = new Structure({
      coord: [longitude, latitude]
    });

    const coordinates: Coordinates = {
      latitude: 45.7560246,
      longitude: 4.79603
    };

    const structureRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<Structure[]> => of([structure])
    } as unknown as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter = new LieuxMediationNumeriqueListPresenter(
      structureRepository
    );

    const structureWithDistance: Structure[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.structuresByDistance$(of(coordinates))
    );

    expect(structureWithDistance).toStrictEqual([
      new Structure({
        coord: [longitude, latitude],
        distance: 3303.8115461567304
      })
    ]);
  });

  it('should not append the distance from some coordinates to a structure when there is no coordinates', async (): Promise<void> => {
    const longitude: number = 4.8563106;
    const latitude: number = 45.6693619;

    const structure: Structure = new Structure({
      coord: [longitude, latitude]
    });

    const structureRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<Structure[]> => of([structure])
    } as unknown as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter = new LieuxMediationNumeriqueListPresenter(
      structureRepository
    );

    const structureWithDistance: Structure[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.structuresByDistance$(of(NO_COORDINATES))
    );

    expect(structureWithDistance).toStrictEqual([
      new Structure({
        coord: [longitude, latitude]
      })
    ]);
  });

  it('should sort structure by distance', async (): Promise<void> => {
    const structures: Structure[] = [
      new Structure({
        coord: [4.8375548, 45.7665478]
      }),
      new Structure({
        coord: [4.8343466, 45.7689958]
      })
    ];

    const coordinates: Coordinates = {
      latitude: 45.7560246,
      longitude: 4.79603
    };

    const structureRepository: LieuxMediationNumeriqueRepository = {
      getAll$: (): Observable<Structure[]> => of(structures)
    } as unknown as LieuxMediationNumeriqueRepository;

    const lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter = new LieuxMediationNumeriqueListPresenter(
      structureRepository
    );

    const structureWithDistance: Structure[] = await firstValueFrom(
      lieuxMediationNumeriqueListPresenter.structuresByDistance$(of(coordinates))
    );

    expect(structureWithDistance).toStrictEqual([
      new Structure({
        coord: [4.8343466, 45.7689958],
        distance: 3303.8115461567304
      }),
      new Structure({
        coord: [4.8375548, 45.7665478],
        distance: 3427.2291417258584
      })
    ]);
  });
});

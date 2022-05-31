import { Structure } from '@gouvfr-anct/mediation-numerique';
import { byStructureDistance, toStructureWithDistance } from './structure-distance.presenter';
import { Coordinates, NO_COORDINATES } from '../../../../../domain';

describe('structure distance presenter', (): void => {
  it('should append the distance from some coordinates to a structure', (): void => {
    const longitude: number = 4.8343466;
    const latitude: number = 45.7689958;

    const structure: Structure = new Structure({
      coord: [longitude, latitude]
    });

    const coordinates: Coordinates = {
      latitude: 45.7560246,
      longitude: 4.79603
    };

    const structureWithDistance: Structure = toStructureWithDistance(structure, coordinates);

    expect(structureWithDistance).toStrictEqual(
      new Structure({
        coord: [longitude, latitude],
        distance: 3303.8115461567304
      })
    );
  });

  it('should not append the distance from some coordinates to a structure when there is no coordinates', (): void => {
    const longitude: number = 4.8563106;
    const latitude: number = 45.6693619;

    const structure: Structure = new Structure({
      coord: [longitude, latitude]
    });

    const structureWithDistance: Structure = toStructureWithDistance(structure, NO_COORDINATES);

    expect(structureWithDistance).toStrictEqual(
      new Structure({
        coord: [longitude, latitude]
      })
    );
  });

  it('should sort structure by distance', (): void => {
    const structures: Structure[] = [
      new Structure({
        distance: 4267
      }),
      new Structure({
        distance: 3304
      })
    ];

    const sortedStructures = structures.sort(byStructureDistance);

    expect(sortedStructures).toStrictEqual([
      new Structure({
        distance: 3304
      }),
      new Structure({
        distance: 4267
      })
    ]);
  });
});

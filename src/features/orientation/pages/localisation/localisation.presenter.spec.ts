import { LieuMediationNumeriquePresentation } from '../../../core';
import { countByDistance, DEFAULT_DISTANCE_RANGES, DistanceRange } from './localisation.presenter';

const MAX_HEIGHT = 150 as const;

describe('localisation presenter', (): void => {
  it('should count no lieu by distance', (): void => {
    const lieux: LieuMediationNumeriquePresentation[] = [];

    const lieuxCountByDistance: DistanceRange[] = countByDistance(lieux);

    expect(lieuxCountByDistance).toStrictEqual(DEFAULT_DISTANCE_RANGES);
  });

  it('should count single lieu by distance', (): void => {
    let lieux: LieuMediationNumeriquePresentation[];
    lieux = [{ distance: 1521 }] as LieuMediationNumeriquePresentation[];

    const lieuxCountByDistance: DistanceRange[] = countByDistance(lieux);

    expect(lieuxCountByDistance).toStrictEqual<DistanceRange[]>([
      { distance: 5000, count: 1, height: MAX_HEIGHT },
      { distance: 10000, count: 0, height: 2 },
      { distance: 15000, count: 0, height: 2 },
      { distance: 20000, count: 0, height: 2 },
      { distance: 25000, count: 0, height: 2 },
      { distance: 30000, count: 0, height: 2 },
      { distance: 35000, count: 0, height: 2 },
      { distance: 40000, count: 0, height: 2 },
      { distance: 45000, count: 0, height: 2 },
      { distance: 50000, count: 0, height: 2 },
      { distance: 55000, count: 0, height: 2 },
      { distance: 60000, count: 0, height: 2 },
      { distance: 65000, count: 0, height: 2 },
      { distance: 70000, count: 0, height: 2 },
      { distance: 75000, count: 0, height: 2 },
      { distance: 80000, count: 0, height: 2 },
      { distance: 85000, count: 0, height: 2 },
      { distance: 90000, count: 0, height: 2 },
      { distance: 95000, count: 0, height: 2 },
      { distance: 100000, count: 0, height: 2 }
    ]);
  });

  it('should count multiple lieux by distance', (): void => {
    let lieux: LieuMediationNumeriquePresentation[];
    lieux = [
      { distance: 63227 },
      { distance: 16385 },
      { distance: 5813 },
      { distance: 1521 }
    ] as LieuMediationNumeriquePresentation[];

    const lieuxCountByDistance: DistanceRange[] = countByDistance(lieux);

    expect(lieuxCountByDistance).toStrictEqual<DistanceRange[]>([
      { distance: 5000, count: 1, height: MAX_HEIGHT },
      { distance: 10000, count: 1, height: MAX_HEIGHT },
      { distance: 15000, count: 0, height: 2 },
      { distance: 20000, count: 1, height: MAX_HEIGHT },
      { distance: 25000, count: 0, height: 2 },
      { distance: 30000, count: 0, height: 2 },
      { distance: 35000, count: 0, height: 2 },
      { distance: 40000, count: 0, height: 2 },
      { distance: 45000, count: 0, height: 2 },
      { distance: 50000, count: 0, height: 2 },
      { distance: 55000, count: 0, height: 2 },
      { distance: 60000, count: 0, height: 2 },
      { distance: 65000, count: 1, height: MAX_HEIGHT },
      { distance: 70000, count: 0, height: 2 },
      { distance: 75000, count: 0, height: 2 },
      { distance: 80000, count: 0, height: 2 },
      { distance: 85000, count: 0, height: 2 },
      { distance: 90000, count: 0, height: 2 },
      { distance: 95000, count: 0, height: 2 },
      { distance: 100000, count: 0, height: 2 }
    ]);
  });

  it('should count multiple lieux by distance with more than 1 lieu fo the same distance', (): void => {
    let lieux: LieuMediationNumeriquePresentation[];
    lieux = [
      { distance: 8919 },
      { distance: 63227 },
      { distance: 16385 },
      { distance: 7351 },
      { distance: 5813 },
      { distance: 1521 }
    ] as LieuMediationNumeriquePresentation[];

    const lieuxCountByDistance: DistanceRange[] = countByDistance(lieux);

    expect(lieuxCountByDistance).toStrictEqual<DistanceRange[]>([
      { distance: 5000, count: 1, height: MAX_HEIGHT / 3 },
      { distance: 10000, count: 3, height: MAX_HEIGHT },
      { distance: 15000, count: 0, height: 2 },
      { distance: 20000, count: 1, height: MAX_HEIGHT / 3 },
      { distance: 25000, count: 0, height: 2 },
      { distance: 30000, count: 0, height: 2 },
      { distance: 35000, count: 0, height: 2 },
      { distance: 40000, count: 0, height: 2 },
      { distance: 45000, count: 0, height: 2 },
      { distance: 50000, count: 0, height: 2 },
      { distance: 55000, count: 0, height: 2 },
      { distance: 60000, count: 0, height: 2 },
      { distance: 65000, count: 1, height: MAX_HEIGHT / 3 },
      { distance: 70000, count: 0, height: 2 },
      { distance: 75000, count: 0, height: 2 },
      { distance: 80000, count: 0, height: 2 },
      { distance: 85000, count: 0, height: 2 },
      { distance: 90000, count: 0, height: 2 },
      { distance: 95000, count: 0, height: 2 },
      { distance: 100000, count: 0, height: 2 }
    ]);
  });
});

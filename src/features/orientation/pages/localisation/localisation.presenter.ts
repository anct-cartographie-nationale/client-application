import { LieuMediationNumeriquePresentation } from '../../../core';

export type DistanceRange = {
  distance: number;
  count: number;
  height: number;
};

type LieuMediationNumeriqueAvecDistance = LieuMediationNumeriquePresentation & { distance: number };

const DISTANCE_PITCH = 5000 as const;

const MAX_HEIGHT = 150 as const;

export const DEFAULT_DISTANCE_RANGES: DistanceRange[] = [
  { distance: 5000, count: 0, height: 2 },
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
];

const sameDistance =
  (distance: number) =>
  (distanceRange: DistanceRange): boolean =>
    distanceRange.distance === distance;

const onlyOtherDistancesThan =
  (distance: number) =>
  (distanceRange: DistanceRange): boolean =>
    !sameDistance(distance)(distanceRange);

const distanceRangeOf = (lieu: LieuMediationNumeriqueAvecDistance): number =>
  Math.ceil(lieu.distance / DISTANCE_PITCH) * DISTANCE_PITCH;

const updateDistanceRange = (
  distanceRanges: DistanceRange[],
  distanceRange: number,
  existingLieuCount: DistanceRange
): DistanceRange[] => [
  ...distanceRanges.filter(onlyOtherDistancesThan(distanceRange)),
  { distance: distanceRange, count: existingLieuCount.count + 1, height: 2 }
];

const nextDistanceRange = (
  distanceRanges: DistanceRange[],
  distanceRange: number,
  existingLieuCount?: DistanceRange
): DistanceRange[] =>
  existingLieuCount ? updateDistanceRange(distanceRanges, distanceRange, existingLieuCount) : distanceRanges;

const groupLieuxByDistance = (distanceRanges: DistanceRange[], lieu: LieuMediationNumeriqueAvecDistance): DistanceRange[] => {
  const distanceRange: number = distanceRangeOf(lieu);
  return nextDistanceRange(distanceRanges, distanceRange, distanceRanges.find(sameDistance(distanceRange)));
};

const inRange = (lieu: LieuMediationNumeriquePresentation): lieu is LieuMediationNumeriqueAvecDistance =>
  lieu.distance != null && lieu.distance < 100000;

const byDistance = (a: DistanceRange, b: DistanceRange): number => a.distance - b.distance;

const maxRangeCount = (distanceRanges: DistanceRange[]): number =>
  distanceRanges.reduce(
    (count: number, currentValue: DistanceRange): number => (currentValue.count > count ? currentValue.count : count),
    0
  );

const normalizeHeight = (distanceRange: DistanceRange, maxCount: number): number =>
  distanceRange.count === 0 || maxCount === 0 ? 2 : (distanceRange.count * MAX_HEIGHT) / maxCount;

const setHeight = (distanceRanges: DistanceRange[]): DistanceRange[] =>
  distanceRanges.map(
    (distanceRange: DistanceRange): DistanceRange => ({
      ...distanceRange,
      height: normalizeHeight(distanceRange, maxRangeCount(distanceRanges))
    })
  );

export const countByDistance = (lieux: LieuMediationNumeriquePresentation[]): DistanceRange[] =>
  setHeight(lieux.filter(inRange).reduce(groupLieuxByDistance, DEFAULT_DISTANCE_RANGES).sort(byDistance));

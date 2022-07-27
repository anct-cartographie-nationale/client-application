import { Localisation } from '../../../../../models';

const HALF_CIRCLE_DEGREE: number = 180;

const DEGREE_TO_RADIANS_FACTOR: number = Math.PI / HALF_CIRCLE_DEGREE;

const EARTH_DIAMETER_M: number = 12_742_000;

const HALF: number = 0.5;

/**
 * https://en.wikipedia.org/wiki/Haversine_formula (optimized with cos)
 */
const usingHaversineFormula = (
  latitudeARadian: number,
  latitudeBRadian: number,
  deltaLatitudeRadian: number,
  deltaLongitudeRadian: number
): number =>
  EARTH_DIAMETER_M *
  Math.asin(
    Math.sqrt(
      HALF *
        (1 -
          Math.cos(deltaLatitudeRadian) +
          Math.cos(latitudeARadian) * Math.cos(latitudeBRadian) * (1 - Math.cos(deltaLongitudeRadian)))
    )
  );

export const geographicDistance = (coordinatesA: Localisation, coordinatesB: Localisation): number => {
  const latitudeARadian: number = coordinatesA.latitude * DEGREE_TO_RADIANS_FACTOR;
  const latitudeBRadian: number = coordinatesB.latitude * DEGREE_TO_RADIANS_FACTOR;
  const deltaLatitudeRadian: number = latitudeBRadian - latitudeARadian;
  const deltaLongitudeRadian: number = (coordinatesB.longitude - coordinatesA.longitude) * DEGREE_TO_RADIANS_FACTOR;

  return usingHaversineFormula(latitudeARadian, latitudeBRadian, deltaLatitudeRadian, deltaLongitudeRadian);
};

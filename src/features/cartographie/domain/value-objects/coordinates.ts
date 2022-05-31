type NoCoordinate = null & { noCoordinate: true };

export type Coordinates =
  | {
      latitude: number;
      longitude: number;
    }
  | NoCoordinate;

export const NO_COORDINATES: Coordinates = null as NoCoordinate;

import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LieuMediationNumeriquePresentation, NO_LOCALISATION } from '../../../core';

export type DistanceRange = {
  distance: number;
  count: number;
  height: number;
};

export const localisationFromStrings = (latitude?: string, longitude?: string): Localisation =>
  latitude == null || longitude == null
    ? NO_LOCALISATION
    : Localisation({
        latitude: +latitude,
        longitude: +longitude
      });

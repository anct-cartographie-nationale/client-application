import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { NO_LOCALISATION } from '../../../core/models';
import { LieuMediationNumeriquePresentation } from '../../../core/presenters';

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

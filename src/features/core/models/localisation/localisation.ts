import { Model } from '../model';

type LocalisationToValidate = {
  latitude?: number;
  longitude?: number;
};

export type Localisation = Model<
  'Localisation',
  {
    latitude: number;
    longitude: number;
  }
>;

export class LatitudeError extends Error {
  constructor(latitude: number | 'indéfinie') {
    super(`La latitude ${latitude} n'est pas valide`);
  }
}

export class LongitudeError extends Error {
  constructor(longitude: number | 'indéfinie') {
    super(`La longitude ${longitude} n'est pas valide`);
  }
}

const isValidLatitude = (localisationData: LocalisationToValidate) =>
  localisationData.latitude != null && localisationData.latitude >= -90 && localisationData.latitude <= 90;

const isValidLongitude = (localisationData: LocalisationToValidate) =>
  localisationData.longitude != null && localisationData.longitude >= -180 && localisationData.longitude <= 180;

export const isValidLocalisation = (localisationData: LocalisationToValidate): localisationData is Localisation =>
  isValidLatitude(localisationData) && isValidLongitude(localisationData);

const throwLocalisationError = (localisationData: LocalisationToValidate): Localisation => {
  if (!isValidLatitude(localisationData)) {
    throw new LatitudeError(localisationData?.latitude ?? 'indéfinie');
  }

  if (!isValidLongitude(localisationData)) {
    throw new LongitudeError(localisationData?.longitude ?? 'indéfinie');
  }

  throw new Error();
};

export const Localisation = (localisation: LocalisationToValidate): Localisation =>
  isValidLocalisation(localisation) ? { ...localisation } : throwLocalisationError(localisation);

type NoLocalisation = null & { noLocalisation: true };

export const NO_LOCALISATION: Localisation = null as NoLocalisation;

import { Localisation, NO_LOCALISATION } from '../../../models';
import { LieuMediationNumeriquePresentation } from '../lieu-mediation-numerique.presentation';

const isInBoundingBox = (localisation: Localisation, [topLeft, bottomRight]: [Localisation, Localisation]) =>
  localisation.latitude <= topLeft.latitude &&
  localisation.longitude >= topLeft.longitude &&
  localisation.latitude >= bottomRight.latitude &&
  localisation.longitude <= bottomRight.longitude;

const isValidBoundingBox = ([topLeft, bottomRight]: [Localisation, Localisation]) =>
  topLeft !== NO_LOCALISATION && bottomRight !== NO_LOCALISATION;

export const byBoundingBox =
  (boundingBox: [Localisation, Localisation]) =>
  <T extends { localisation: Localisation }>({ localisation }: T) =>
    !isValidBoundingBox(boundingBox) || isInBoundingBox(localisation, boundingBox);

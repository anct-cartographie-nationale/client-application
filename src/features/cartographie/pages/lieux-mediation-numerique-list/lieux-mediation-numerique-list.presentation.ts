import { ParamMap } from '@angular/router';
import { LieuMediationNumerique } from '@gouvfr-anct/lieux-de-mediation-numerique';
import {
  departementFromCode,
  departementFromNom,
  DepartementPresentation,
  LieuMediationNumeriquePresentation,
  LieuMediationNumeriquePresentationWithDistance,
  RegionPresentation,
  toDepartement
} from '../../../core/presenters';
import { HubPresentation } from '../../presenters';

export const findLieuToFocus =
  (paramMap: ParamMap) =>
  (lieux: LieuMediationNumerique[]): LieuMediationNumerique | undefined =>
    lieux.find((lieu: LieuMediationNumerique): boolean => lieu.id === paramMap.get('id'));

const shouldSortOnCodePostal = (
  lieuA: LieuMediationNumeriquePresentation,
  lieuB: LieuMediationNumeriquePresentation
): boolean => lieuA.code_postal !== lieuB.code_postal;

const hasDistance = (lieu: LieuMediationNumeriquePresentation): lieu is LieuMediationNumeriquePresentationWithDistance =>
  lieu.distance != null;

const sortOnCodePostal = (lieuA: LieuMediationNumeriquePresentation, lieuB: LieuMediationNumeriquePresentation): number =>
  lieuA.code_postal < lieuB.code_postal ? -1 : 1;

const sortOnDistance = (
  lieuA: LieuMediationNumeriquePresentationWithDistance,
  lieuB: LieuMediationNumeriquePresentationWithDistance
): number => lieuA.distance - lieuB.distance;

const sortOnNom = (lieuA: LieuMediationNumeriquePresentation, lieuB: LieuMediationNumeriquePresentation): number =>
  lieuA.nom < lieuB.nom ? -1 : 1;

export const toSortedLieux = (lieux: LieuMediationNumeriquePresentation[]): LieuMediationNumeriquePresentation[] =>
  lieux.sort((lieuA: LieuMediationNumeriquePresentation, lieuB: LieuMediationNumeriquePresentation): number => {
    if (hasDistance(lieuA) && hasDistance(lieuB)) return sortOnDistance(lieuA, lieuB);
    if (shouldSortOnCodePostal(lieuA, lieuB)) return sortOnCodePostal(lieuA, lieuB);
    return sortOnNom(lieuA, lieuB);
  });

const filteredByDepartementIfExist = (
  departement: DepartementPresentation | undefined,
  lieux: LieuMediationNumeriquePresentation[]
): LieuMediationNumeriquePresentation[] =>
  departement
    ? lieux.filter((lieu: LieuMediationNumeriquePresentation): boolean => toDepartement(lieu)?.code === departement.code)
    : lieux;

export const toLieuxFilteredByDepartement = (lieux: LieuMediationNumeriquePresentation[], nomDepartement: string) =>
  filteredByDepartementIfExist(departementFromNom(nomDepartement), lieux);

export const toHub = (region: RegionPresentation): HubPresentation => ({
  nom: region.hub?.nom,
  source: region.hub?.source,
  url: region.hub?.url,
  region: region.nom,
  departements: region.departements.map((departement: string) => ({
    nom: departementFromCode(departement)?.nom,
    numero: departement
  }))
});

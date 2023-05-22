import { ParamMap } from '@angular/router';
import { LieuMediationNumerique, Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import {
  departementFromCode,
  departementFromNom,
  DepartementPresentation,
  LieuMediationNumeriquePresentation,
  RegionPresentation,
  toDepartement
} from '../../../core/presenters';
import { HubPresentation } from '../../presenters';

export const findLieuToFocus =
  (paramMap: ParamMap) =>
  (lieux: LieuMediationNumerique[]): LieuMediationNumerique | undefined =>
    lieux.find((lieu: LieuMediationNumerique) => lieu.id === paramMap.get('id'));

const shouldSortOnCodePostal = (
  lieuA: LieuMediationNumeriquePresentation,
  lieuB: LieuMediationNumeriquePresentation
): boolean => lieuA.code_postal !== lieuB.code_postal;

const sortOnCodePostal = (lieuA: LieuMediationNumeriquePresentation, lieuB: LieuMediationNumeriquePresentation): number =>
  lieuA.code_postal < lieuB.code_postal ? -1 : 1;

const sortOnNom = (lieuA: LieuMediationNumeriquePresentation, lieuB: LieuMediationNumeriquePresentation): number =>
  lieuA.nom < lieuB.nom ? -1 : 1;

export const toLieux =
  (localisation: Localisation) =>
  (lieux: LieuMediationNumeriquePresentation[]): LieuMediationNumeriquePresentation[] => {
    return localisation
      ? lieux
      : lieux.sort((lieuA, lieuB) =>
          shouldSortOnCodePostal(lieuA, lieuB) ? sortOnCodePostal(lieuA, lieuB) : sortOnNom(lieuA, lieuB)
        );
  };

const filteredByDepartementIfExist = (
  departement: DepartementPresentation | undefined,
  lieux: LieuMediationNumeriquePresentation[]
): LieuMediationNumeriquePresentation[] =>
  departement
    ? lieux.filter((lieu: LieuMediationNumeriquePresentation) => toDepartement(lieu)?.code === departement.code)
    : lieux;

export const toLieuxFilteredByDepartement = ([lieux, paramMap]: [
  LieuMediationNumeriquePresentation[],
  ParamMap
]): LieuMediationNumeriquePresentation[] =>
  filteredByDepartementIfExist(departementFromNom(paramMap.get('nomDepartement') ?? ''), lieux);

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

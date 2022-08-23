import codePostalNotMatchingCodeDepartement from './code-postal-not-matching-code-departement.json';
import { departements, LieuMediationNumeriquePresentation, Localisation, regions } from '../../../core';
import { DepartementPresentation } from './presentations/departement.presentation';
import { RegionPresentation } from './presentations/region.presentation';

const codePostalNotMatchingCodeDepartementMap: Map<string, string> = new Map<string, string>(
  codePostalNotMatchingCodeDepartement as []
);

const isInCorseDuSud = (codePostal: string): boolean => codePostal.startsWith('201') || codePostal.startsWith('200');

const getCorseCodeDepartement = (codePostal: string): string => (isInCorseDuSud(codePostal) ? '2A' : '2B');

const isInCorse = (codePostal: string): boolean => codePostal.startsWith('20');

const convertEdgeCasesToCodeInsee = (codePostal: string): string =>
  codePostalNotMatchingCodeDepartementMap.get(codePostal) ?? codePostal;

const codeDepartementFromCodePostal = (codePostal: string) =>
  isInCorse(codePostal) ? getCorseCodeDepartement(codePostal) : convertEdgeCasesToCodeInsee(codePostal).slice(0, 2);

const codeDepartementFromCodeInsee = (codeInsee: string) => codeInsee.slice(0, 2);

const toCodeDepartement = (lieuDeMediationNumerique: LieuMediationNumeriquePresentation): string => {
  return lieuDeMediationNumerique.adresse.code_insee
    ? codeDepartementFromCodeInsee(lieuDeMediationNumerique.adresse.code_insee)
    : codeDepartementFromCodePostal(lieuDeMediationNumerique.adresse.code_postal);
};

export const toDepartement = (
  lieuDeMediationNumerique: LieuMediationNumeriquePresentation
): DepartementPresentation | undefined =>
  departements.find((departement: DepartementPresentation) => departement.code === toCodeDepartement(lieuDeMediationNumerique));

export const toRegion = (lieuDeMediationNumerique: LieuMediationNumeriquePresentation): RegionPresentation | undefined =>
  regions.find((region: RegionPresentation) => region.departements.includes(toCodeDepartement(lieuDeMediationNumerique)));

export const definedDepartement = (
  collectiviteTerritoriale?: DepartementPresentation
): collectiviteTerritoriale is DepartementPresentation => collectiviteTerritoriale != undefined;

export const definedRegion = (collectiviteTerritoriale?: RegionPresentation): collectiviteTerritoriale is RegionPresentation =>
  collectiviteTerritoriale != undefined;

const matchingCollectiviteTerritorialeCode =
  <T extends RegionPresentation | DepartementPresentation>(currentValue: T) =>
  (collectiviteTerritoriale: T) =>
    collectiviteTerritoriale.code === currentValue.code;

const byCollectiviteTerritorialeCode =
  <T extends RegionPresentation | DepartementPresentation>(currentValue: T) =>
  (collectiviteTerritoriale: T) =>
    !matchingCollectiviteTerritorialeCode(currentValue)(collectiviteTerritoriale);

const addLieuToCollectivitesTerritorialesWithLieuxCount = <T extends RegionPresentation | DepartementPresentation>(
  collectiviteTerritoriale: T,
  collectivitesTerritorialesWithLieuxCount: T[],
  alreadyPresentCollectiviteTerritoriale?: T
) =>
  alreadyPresentCollectiviteTerritoriale
    ? [
        ...collectivitesTerritorialesWithLieuxCount.filter(byCollectiviteTerritorialeCode(collectiviteTerritoriale)),
        { ...alreadyPresentCollectiviteTerritoriale, lieuxCount: (alreadyPresentCollectiviteTerritoriale.lieuxCount ?? 0) + 1 }
      ]
    : [...collectivitesTerritorialesWithLieuxCount, { ...collectiviteTerritoriale, lieuxCount: 1 }];

export const countLieuxInCollectiviteTerritoriale = <T extends RegionPresentation | DepartementPresentation>(
  collectivitesTerritorialesWithLieuxCount: T[],
  collectiviteTerritoriale: T
): T[] =>
  addLieuToCollectivitesTerritorialesWithLieuxCount(
    collectiviteTerritoriale,
    collectivitesTerritorialesWithLieuxCount,
    collectivitesTerritorialesWithLieuxCount.find(matchingCollectiviteTerritorialeCode(collectiviteTerritoriale))
  );

export const byLieuxCount = <T extends RegionPresentation | DepartementPresentation>(
  collectiviteTerritorialeA: T,
  collectiviteTerritorialeB: T
): number => (collectiviteTerritorialeB.lieuxCount ?? 0) - (collectiviteTerritorialeA.lieuxCount ?? 0);

export const byCollectiviteTerritorialeNom = <T extends DepartementPresentation | RegionPresentation>(
  collectiviteTerritorialeA: T,
  collectiviteTerritorialeB: T
) => collectiviteTerritorialeA.nom.localeCompare(collectiviteTerritorialeB.nom);

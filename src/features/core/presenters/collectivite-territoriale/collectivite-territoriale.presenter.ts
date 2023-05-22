import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { departements, geographicDistance, FrancePresentation, regions, france } from '../../../core/presenters';
import codePostalNotMatchingCodeDepartement from './code-postal-not-matching-code-departement.json';
import { DepartementPresentation } from './presentations/departement.presentation';
import { RegionPresentation } from './presentations/region.presentation';

const codePostalNotMatchingCodeDepartementMap: Map<string, string> = new Map<string, string>(
  codePostalNotMatchingCodeDepartement as []
);

const isInCorseDuSud = (codePostal: string): boolean => codePostal.startsWith('201') || codePostal.startsWith('200');

const getCorseCodeDepartement = (codePostal: string): string => (isInCorseDuSud(codePostal) ? '2A' : '2B');

const isInCorse = (codePostal: string): boolean => codePostal.startsWith('20');

const isInOutremer = (codePostal: string): boolean => codePostal.startsWith('97');

const isSaintMartin = (codePostal: string, commune: string): boolean => {
  if (!commune) return false;
  return codePostal.startsWith('97') && commune.toLocaleLowerCase().includes('saint martin');
};

const convertEdgeCasesToCodeInsee = (codePostal: string): string =>
  codePostalNotMatchingCodeDepartementMap.get(codePostal) ?? codePostal;

const codeDepartementFromCodePostal = (codePostal: string, commune: string) => {
  if (isInCorse(codePostal)) {
    return getCorseCodeDepartement(codePostal);
  } else if (isSaintMartin(codePostal, commune)) {
    return convertEdgeCasesToCodeInsee(codePostal).slice(0, 3);
  } else if (isInOutremer(codePostal)) {
    return codePostal.slice(0, 3);
  }

  return convertEdgeCasesToCodeInsee(codePostal).slice(0, 2);
};

const toCodeDepartement = (lieu: { code_postal: string; commune: string }): string =>
  codeDepartementFromCodePostal(lieu.code_postal, lieu.commune);

export const toDepartement = (lieu: { code_postal: string; commune: string }): DepartementPresentation | undefined =>
  departements.find((departement: DepartementPresentation) => departement.code === toCodeDepartement(lieu));

export const toRegion = (lieu: { code_postal: string; commune: string }): RegionPresentation | undefined =>
  regions.find((region: RegionPresentation) => region.departements.includes(toCodeDepartement(lieu)));

export const toFrance = (lieu: { code_postal: string; commune: string }): FrancePresentation | undefined =>
  france.find((zone: FrancePresentation) => zone.regions.includes(toRegion(lieu)?.code ?? ''));

export const onlyDefined = <T>(collectiviteTerritoriale?: T): collectiviteTerritoriale is T =>
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

export const regionFromDepartement = (departement: DepartementPresentation): RegionPresentation | undefined =>
  regions.find((region: RegionPresentation) => region.departements.includes(departement.code));

export const departementFromNom = (nomDepartement: string): DepartementPresentation | undefined =>
  departements.find((departement: DepartementPresentation) => departement.nom === nomDepartement);

export const departementFromCode = (codeDepartement: string): DepartementPresentation | undefined =>
  departements.find((departement: DepartementPresentation) => departement.code === codeDepartement);

export const regionFromNom = (nomRegion: string): RegionPresentation | undefined =>
  regions.find((region: RegionPresentation) => region.nom === nomRegion);

const regionWithDistance = (region: RegionPresentation, localisation: Localisation) => ({
  ...region,
  distance: geographicDistance(region.localisation, localisation)
});

const nearestBetween = <T>(
  collectiviteTerritorialeA: T & { distance: number },
  collectiviteTerritorialeB: T & { distance: number }
) =>
  collectiviteTerritorialeA.distance < collectiviteTerritorialeB.distance
    ? collectiviteTerritorialeA
    : collectiviteTerritorialeB;

export const nearestRegion = (localisation: Localisation): RegionPresentation =>
  regions.reduce(
    (nearestRegion: RegionPresentation & { distance: number }, region: RegionPresentation) =>
      nearestBetween(nearestRegion, regionWithDistance(region, localisation)),
    regionWithDistance(regions[0], localisation)
  );

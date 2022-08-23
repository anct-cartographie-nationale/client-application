import { DepartementPresentation } from './presentations/departement.presentation';
import departementsJSON from './departements.json';
import regionsJSON from './regions.json';
import { RegionPresentation } from './presentations/region.presentation';

export const departements: DepartementPresentation[] = departementsJSON as DepartementPresentation[];
export const regions: RegionPresentation[] = regionsJSON as RegionPresentation[];
export * from './collectivite-territoriale.presenter';
export * from './presentations/departement.presentation';
export * from './presentations/region.presentation';

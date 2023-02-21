import departementsJSON from './departements.json';
import regionsJSON from './regions.json';
import franceJSON from './france.json';
import { DepartementPresentation } from './presentations/departement.presentation';
import { RegionPresentation } from './presentations/region.presentation';
import { FrancePresentation } from './presentations/france.presentation';

export const departements: DepartementPresentation[] = departementsJSON as DepartementPresentation[];
export const regions: RegionPresentation[] = regionsJSON as RegionPresentation[];
export const france: FrancePresentation[] = franceJSON as FrancePresentation[];
export * from './collectivite-territoriale.presenter';
export * from './presentations/departement.presentation';
export * from './presentations/region.presentation';
export * from './presentations/france.presentation';
export * from './presentations/territoire.presentation';

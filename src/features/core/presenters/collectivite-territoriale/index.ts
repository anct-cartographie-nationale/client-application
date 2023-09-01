import departementsJSON from './departements.json';
import regionsJSON from './regions.json';
import franceJSON from './france.json';
import { DepartementPresentation, FrancePresentation, RegionPresentation } from './presentations/territoire.presentation';

export const departements: DepartementPresentation[] = departementsJSON as DepartementPresentation[];
export const regions: RegionPresentation[] = regionsJSON as RegionPresentation[];
export const france: FrancePresentation[] = franceJSON as FrancePresentation[];

export * from './collectivite-territoriale.presenter';
export * from './presentations/territoire.presentation';

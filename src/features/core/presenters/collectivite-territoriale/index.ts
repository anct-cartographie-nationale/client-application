import { DepartementPresentation } from './departement/departement.presentation';
import departementsJSON from './departements.json';

export const departements: DepartementPresentation[] = departementsJSON as DepartementPresentation[];
export * from './collectivite-territoriale.presenter';
export * from './departement/departement.presentation';

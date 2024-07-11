import { InjectionToken } from '@angular/core';

export type DataConfiguration = {
  lieuxDeMediationNumerique: string;
};

export type DataCoordinateursConfiguration = {
  conseillers: string;
  coordinateurs: string;
};

export const DATA_COORDINATEURS_CONFIGURATION: DataCoordinateursConfiguration = {
  conseillers: 'https://api.conseiller-numerique.gouv.fr/coordination-conseillers',
  coordinateurs: 'https://api.conseiller-numerique.gouv.fr/coordinateurs'
};

export const DATA_TOKEN: InjectionToken<DataConfiguration> = new InjectionToken<DataConfiguration>('data.configuration');

export const DATA_CONFIGURATION: DataConfiguration = {
  lieuxDeMediationNumerique: 'https://www.data.gouv.fr/fr/datasets/r/b5e5a1e1-122e-4f87-b6cf-d1ce342671be'
};

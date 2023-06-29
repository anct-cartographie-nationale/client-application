import { InjectionToken } from '@angular/core';

export type DataConfiguration = {
  lieuxDeMediationNumerique: string;
};

export type DataCoordinateursConfiguration = {
  conseillers: string;
  coordinateurs: string;
};

export const DATA_COORDINATEURS_CONFIGURATION: DataCoordinateursConfiguration = {
  conseillers: 'https://beta.api.conseiller-numerique.gouv.fr/coordination-conseillers',
  coordinateurs: 'https://beta.api.conseiller-numerique.gouv.fr/coordinateurs'
};

export const DATA_TOKEN: InjectionToken<DataConfiguration> = new InjectionToken<DataConfiguration>('data.configuration');

export const DATA_CONFIGURATION: DataConfiguration = {
  lieuxDeMediationNumerique: 'https://www.data.gouv.fr/fr/datasets/r/bdfef095-f3a9-4e66-84bb-ea05d5c9c3a5'
};

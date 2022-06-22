import { InjectionToken } from '@angular/core';

export type DataConfiguration = {
  lieuxDeMediationNumerique: string;
};

export const DATA_TOKEN: InjectionToken<DataConfiguration> = new InjectionToken<DataConfiguration>('data.configuration');

export const DATA_CONFIGURATION: DataConfiguration = {
  lieuxDeMediationNumerique: 'assets/data/lieux-de-mediation-numerique.json'
};

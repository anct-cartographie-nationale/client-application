import { InjectionToken } from '@angular/core';

export type DataConfiguration = {
  lieuxDeMediationNumerique: string;
};

export const DATA_TOKEN: InjectionToken<DataConfiguration> = new InjectionToken<DataConfiguration>('data.configuration');

export const DATA_CONFIGURATION: DataConfiguration = {
  lieuxDeMediationNumerique:
    'https://anct-carto-client-feature-les-assembleurs.s3.eu-west-3.amazonaws.com/lieux-de-mediation-numeriques.json'
};

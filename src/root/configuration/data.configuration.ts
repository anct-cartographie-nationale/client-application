import { InjectionToken } from '@angular/core';
import { environment } from '../../environments/environment';

export type DataConfiguration = {
  lieuxDeMediationNumerique: string;
};

export const DATA_TOKEN: InjectionToken<DataConfiguration> = new InjectionToken<DataConfiguration>('data.configuration');

export const DATA_CONFIGURATION: DataConfiguration = {
  lieuxDeMediationNumerique: environment.production
    ? '/assets/data/lieux-de-mediation-numerique.ile-de-france.json'
    : '/assets/data/lieux-de-mediation-numerique.local-fake.json'
};

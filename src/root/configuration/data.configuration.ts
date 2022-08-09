import { InjectionToken } from '@angular/core';
import { environment } from '../../environments/environment';

export type DataConfiguration = {
  lieuxDeMediationNumerique: string;
};

export const DATA_TOKEN: InjectionToken<DataConfiguration> = new InjectionToken<DataConfiguration>('data.configuration');

export const DATA_CONFIGURATION: DataConfiguration = {
  lieuxDeMediationNumerique: environment.production
    ? 'https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@2.5.0/assets/data/lieux-cnfs-idf.json'
    : '/assets/data/lieux-de-mediation-numerique.json'
};

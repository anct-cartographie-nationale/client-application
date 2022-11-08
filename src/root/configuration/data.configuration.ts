import { InjectionToken } from '@angular/core';
import { environment } from '../../environments/environment';

export type DataConfiguration = {
  lieuxDeMediationNumerique: string;
};

export const DATA_TOKEN: InjectionToken<DataConfiguration> = new InjectionToken<DataConfiguration>('data.configuration');

export const DATA_CONFIGURATION: DataConfiguration = {
  lieuxDeMediationNumerique:
    'https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@4.4.0/assets/data/data-normalize-hauts-de-france.json'
};

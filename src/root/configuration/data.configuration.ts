import { InjectionToken } from '@angular/core';
import { environment } from '../../environments/environment';

export type DataConfiguration = {
  lieuxDeMediationNumerique: string;
};

export const DATA_TOKEN: InjectionToken<DataConfiguration> = new InjectionToken<DataConfiguration>('data.configuration');

export const DATA_CONFIGURATION: DataConfiguration = {
  lieuxDeMediationNumerique: 'https://www.data.gouv.fr/fr/datasets/r/b5e5a1e1-122e-4f87-b6cf-d1ce342671be'
};

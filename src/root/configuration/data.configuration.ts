import { InjectionToken } from '@angular/core';
import { environment } from '../../environments/environment';

export type DataConfiguration = {
  lieuxDeMediationNumerique: string;
};

export const DATA_TOKEN: InjectionToken<DataConfiguration> = new InjectionToken<DataConfiguration>('data.configuration');

export const DATA_CONFIGURATION: DataConfiguration = {
  lieuxDeMediationNumerique: 'https://www.data.gouv.fr/fr/datasets/r/9cb4d69b-f666-4d4c-a3b3-d119809f28a8'
};

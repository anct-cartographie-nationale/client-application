import { InjectionToken } from '@angular/core';
import { environment } from '../../environments/environment';

export type DataConfiguration = {
  lieuxDeMediationNumerique: string;
};

export const DATA_TOKEN: InjectionToken<DataConfiguration> = new InjectionToken<DataConfiguration>('data.configuration');

export const DATA_CONFIGURATION: DataConfiguration = {
  lieuxDeMediationNumerique: 'https://www.data.gouv.fr/fr/datasets/r/da914fdc-f073-4074-9d7c-87efc856824e'
};

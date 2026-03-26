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
  lieuxDeMediationNumerique:
    'https://cartographie.societenumerique.gouv.fr/api/v0/lieux-inclusion-numerique?adresse[eq][code_insee]=76196,76254,76305,76341,76351,76447,76552,76647,76716,76014,76017,76064,76079,76117,76167,76169,76206,76238,76239,76250,76268,76270,76275,76296,76303,76307,76314,76357,76361,76404,76409,76477,76481,76489,76501,76508,76522,76533,76534,76551,76563,76586,76595,76596,76609,76615,76616,76657,76658,76660,76693,76714,76734,76741'
};

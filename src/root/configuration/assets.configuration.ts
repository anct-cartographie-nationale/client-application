import { InjectionToken } from '@angular/core';

export type AssetsConfiguration = {
  path: string;
};

export const ASSETS_TOKEN: InjectionToken<AssetsConfiguration> = new InjectionToken<AssetsConfiguration>(
  'assets.configuration'
);

export const ASSETS_CONFIGURATION: AssetsConfiguration = {
  path: 'https://cdn.jsdelivr.net/npm/@gouvfr-anct/cartographie-nationale@5.13.0/assets'
};

export const ASSETS_APPLICATION_CONFIGURATION: AssetsConfiguration = {
  path: '/assets'
};

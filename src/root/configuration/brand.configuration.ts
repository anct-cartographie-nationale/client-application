import { InjectionToken } from '@angular/core';

export type BrandConfiguration = {
  name: string;
  logo: string;
  logo_variant: string;
  illustration: string;
};

export const BRAND_TOKEN: InjectionToken<BrandConfiguration> = new InjectionToken<BrandConfiguration>('brand.configuration');

export const BRAND_CONFIGURATION: BrandConfiguration = {
  name: 'Nationale',
  logo: '',
  logo_variant: '',
  illustration: 'svg-france-et-outremer.svg'
};

export const BRAND_APPLICATION_CONFIGURATION: BrandConfiguration = {
  name: 'Nationale',
  logo: './assets/img/logo/cartographie-nationale-brand.png',
  logo_variant: './assets/img/logo/cartographie-nationale-brand-variant.png',
  illustration: 'svg-france-et-outremer.svg'
};

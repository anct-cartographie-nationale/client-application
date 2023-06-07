import { InjectionToken } from '@angular/core';

export type BrandConfiguration = {
  name: string;
  logo: string;
  logo_text?: string;
  illustration: string;
};

export const BRAND_TOKEN: InjectionToken<BrandConfiguration> = new InjectionToken<BrandConfiguration>('brand.configuration');

export const BRAND_CONFIGURATION: BrandConfiguration = {
  name: 'Nationale',
  logo: '',
  illustration: 'svg-france-et-outremer.svg'
};

export const BRAND_APPLICATION_CONFIGURATION: BrandConfiguration = {
  name: 'Nationale',
  logo: './assets/img/logo/cartographie-nationale-brand.png',
  logo_text: './assets/img/logo/cartographie-nationale-brand-text.png',
  illustration: 'svg-france-et-outremer.svg'
};

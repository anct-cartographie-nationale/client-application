import { InjectionToken } from '@angular/core';

export type BrandConfiguration = {
  name: string;
  logo: string;
};

export const BRAND_TOKEN: InjectionToken<BrandConfiguration> = new InjectionToken<BrandConfiguration>('brand.configuration');

export const BRAND_CONFIGURATION: BrandConfiguration = {
  name: 'Les Assembleurs',
  logo: 'https://assembleurs.co/static/Icone_logo_Assembleurs-c72c4e056eb34a846a713939501dad85.png'
};

import { Title } from '@angular/platform-browser';
import { BrandConfiguration } from '../../configuration';

const onlyDefined = (part: string | undefined): boolean => part != null;

const websiteNameFrom = (brandConfiguration: BrandConfiguration): string =>
  [brandConfiguration.name, brandConfiguration.sousTitre].filter(onlyDefined).join(' ');

export const titleFromBrand =
  (brandConfiguration: BrandConfiguration) =>
  (pages: (string | undefined)[] = []): string =>
    [...pages, `Cartographie ${websiteNameFrom(brandConfiguration)}`].filter(onlyDefined).join(' - ');

export const setTitleAction =
  (brandConfiguration: BrandConfiguration, titleService: Title) =>
  (pages: (string | undefined)[] = []): void => {
    titleService.setTitle(titleFromBrand(brandConfiguration)(pages));
  };

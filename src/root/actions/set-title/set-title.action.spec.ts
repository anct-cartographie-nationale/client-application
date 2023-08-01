import { titleFromBrand } from './set-title.action';
import { BrandConfiguration } from '../../configuration';

describe('set title action', (): void => {
  it('should get configuration name as title', (): void => {
    const brandConfiguration: BrandConfiguration = {
      name: 'Nationale'
    } as BrandConfiguration;

    const title: string = titleFromBrand(brandConfiguration)();

    expect(title).toBe('Cartographie Nationale');
  });

  it('should get configuration name and subtitle as title', (): void => {
    const brandConfiguration: BrandConfiguration = {
      name: 'Nationale',
      sousTitre: "des lieux d'inclusion numérique"
    } as BrandConfiguration;

    const title: string = titleFromBrand(brandConfiguration)();

    expect(title).toBe("Cartographie Nationale des lieux d'inclusion numérique");
  });

  it('should get configuration name as title with current page', (): void => {
    const brandConfiguration: BrandConfiguration = {
      name: 'Nationale'
    } as BrandConfiguration;

    const title: string = titleFromBrand(brandConfiguration)(['Accueil']);

    expect(title).toBe('Accueil - Cartographie Nationale');
  });
});

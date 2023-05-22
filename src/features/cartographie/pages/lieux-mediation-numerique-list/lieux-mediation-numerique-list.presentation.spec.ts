import { HubPresentation } from '../../presenters';
import { toHub } from './lieux-mediation-numerique-list.presentation';
import { RegionPresentation } from '../../../core/presenters';

describe('lieux mediation numerique list presentation', (): void => {
  it('should get hub from region', (): void => {
    const region: RegionPresentation = {
      nom: 'Auvergne-Rhône-Alpes',
      departements: ['01'],
      hub: {
        nom: 'Hinaura',
        source: 'hinaura',
        url: 'https://www.hinaura.fr/'
      }
    } as unknown as RegionPresentation;

    const hub: HubPresentation = toHub(region);

    expect(hub).toStrictEqual<HubPresentation>({
      nom: 'Hinaura',
      source: 'hinaura',
      url: 'https://www.hinaura.fr/',
      region: 'Auvergne-Rhône-Alpes',
      departements: [
        {
          nom: 'Ain',
          numero: '01'
        }
      ]
    });
  });
});

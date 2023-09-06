import { HubPresentation } from '../../presenters';
import { toHub, toSortedLieux } from './lieux-mediation-numerique-list.presentation';
import { LieuMediationNumeriquePresentation, RegionPresentation } from '../../../core/presenters';

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

  it('should sort lieux by code postal', (): void => {
    const lieux: LieuMediationNumeriquePresentation[] = [
      {
        id: 'lieu-1',
        code_postal: '69005',
        commune: 'Lyon',
        date_maj: new Date('2023-09-01'),
        latitude: 0,
        longitude: 0,
        nom: 'Lieu 1',
        services: [],
        voie: '10 Impasse Secret'
      },
      {
        id: 'lieu-2',
        code_postal: '69002',
        commune: 'Lyon',
        date_maj: new Date('2023-09-01'),
        latitude: 0,
        longitude: 0,
        nom: 'Lieu 2',
        services: [],
        voie: '3 Place Renée Dufourt'
      }
    ];

    const sortedLieux: LieuMediationNumeriquePresentation[] = toSortedLieux(lieux);

    expect(sortedLieux).toStrictEqual([
      {
        id: 'lieu-2',
        code_postal: '69002',
        commune: 'Lyon',
        date_maj: new Date('2023-09-01'),
        latitude: 0,
        longitude: 0,
        nom: 'Lieu 2',
        services: [],
        voie: '3 Place Renée Dufourt'
      },
      {
        id: 'lieu-1',
        code_postal: '69005',
        commune: 'Lyon',
        date_maj: new Date('2023-09-01'),
        latitude: 0,
        longitude: 0,
        nom: 'Lieu 1',
        services: [],
        voie: '10 Impasse Secret'
      }
    ]);
  });

  it('should sort lieux by nom when same code postal', (): void => {
    const lieux: LieuMediationNumeriquePresentation[] = [
      {
        id: 'lieu-2',
        code_postal: '69005',
        commune: 'Lyon',
        date_maj: new Date('2023-09-01'),
        latitude: 0,
        longitude: 0,
        nom: 'Lieu 2',
        services: [],
        voie: '10 Rue Joliot Curie'
      },
      {
        id: 'lieu-1',
        code_postal: '69005',
        commune: 'Lyon',
        date_maj: new Date('2023-09-01'),
        latitude: 0,
        longitude: 0,
        nom: 'Lieu 1',
        services: [],
        voie: '10 Impasse Secret'
      }
    ];

    const sortedLieux: LieuMediationNumeriquePresentation[] = toSortedLieux(lieux);

    expect(sortedLieux).toStrictEqual([
      {
        id: 'lieu-1',
        code_postal: '69005',
        commune: 'Lyon',
        date_maj: new Date('2023-09-01'),
        latitude: 0,
        longitude: 0,
        nom: 'Lieu 1',
        services: [],
        voie: '10 Impasse Secret'
      },
      {
        id: 'lieu-2',
        code_postal: '69005',
        commune: 'Lyon',
        date_maj: new Date('2023-09-01'),
        latitude: 0,
        longitude: 0,
        nom: 'Lieu 2',
        services: [],
        voie: '10 Rue Joliot Curie'
      }
    ]);
  });

  it('should sort lieux by distance', (): void => {
    const lieux: LieuMediationNumeriquePresentation[] = [
      {
        id: 'lieu-1',
        code_postal: '69005',
        commune: 'Lyon',
        date_maj: new Date('2023-09-01'),
        latitude: 0,
        longitude: 0,
        nom: 'Lieu 1',
        services: [],
        voie: '10 Impasse Secret',
        distance: 250
      },
      {
        id: 'lieu-2',
        code_postal: '69002',
        commune: 'Lyon',
        date_maj: new Date('2023-09-01'),
        latitude: 0,
        longitude: 0,
        nom: 'Lieu 2',
        services: [],
        voie: '3 Place Renée Dufourt',
        distance: 575
      }
    ];

    const sortedLieux: LieuMediationNumeriquePresentation[] = toSortedLieux(lieux);

    expect(sortedLieux).toStrictEqual([
      {
        id: 'lieu-1',
        code_postal: '69005',
        commune: 'Lyon',
        date_maj: new Date('2023-09-01'),
        latitude: 0,
        longitude: 0,
        nom: 'Lieu 1',
        services: [],
        voie: '10 Impasse Secret',
        distance: 250
      },
      {
        id: 'lieu-2',
        code_postal: '69002',
        commune: 'Lyon',
        date_maj: new Date('2023-09-01'),
        latitude: 0,
        longitude: 0,
        nom: 'Lieu 2',
        services: [],
        voie: '3 Place Renée Dufourt',
        distance: 575
      }
    ]);
  });
});

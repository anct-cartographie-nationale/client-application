import { PerimetrePresentation } from './perimetre';
import { toFilteredCoordinateurs } from './filter-coordinateur.presenter';
import { CoordinateursFilterPresentation } from './filter.presentation';

describe('filter coordinateurs presenter', (): void => {
  it('should not filter coordinateurs', (): void => {
    const coordinateurs: { perimetre: PerimetrePresentation }[] = [
      { perimetre: 'Départemental' },
      { perimetre: 'Bassin de vie' },
      { perimetre: 'Bassin de vie' },
      { perimetre: 'Bassin de vie' },
      { perimetre: 'Départemental' },
      { perimetre: 'Départemental' },
      { perimetre: 'Départemental' }
    ];

    const filteredCoordinateurs: { perimetre: PerimetrePresentation }[] = toFilteredCoordinateurs([
      coordinateurs,
      { perimetre: [] }
    ]);

    expect(filteredCoordinateurs.length).toBe(7);
  });

  it('should filter coordinateurs Départemental', (): void => {
    const coordinateursFilter: CoordinateursFilterPresentation = { perimetre: ['Départemental'] };

    const coordinateurs: { perimetre: PerimetrePresentation }[] = [
      { perimetre: 'Départemental' },
      { perimetre: 'Bassin de vie' },
      { perimetre: 'Bassin de vie' },
      { perimetre: 'Bassin de vie' },
      { perimetre: 'Départemental' },
      { perimetre: 'Départemental' },
      { perimetre: 'Départemental' }
    ];

    const filteredCoordinateurs: { perimetre: PerimetrePresentation }[] = toFilteredCoordinateurs([
      coordinateurs,
      coordinateursFilter
    ]);

    expect(filteredCoordinateurs.length).toBe(4);
  });

  it('should filter coordinateurs Bassin de vie', (): void => {
    const coordinateursFilter: CoordinateursFilterPresentation = { perimetre: ['Bassin de vie'] };

    const coordinateurs: { perimetre: PerimetrePresentation }[] = [
      { perimetre: 'Départemental' },
      { perimetre: 'Bassin de vie' },
      { perimetre: 'Bassin de vie' },
      { perimetre: 'Bassin de vie' },
      { perimetre: 'Départemental' },
      { perimetre: 'Départemental' },
      { perimetre: 'Départemental' }
    ];

    const filteredCoordinateurs: { perimetre: PerimetrePresentation }[] = toFilteredCoordinateurs([
      coordinateurs,
      coordinateursFilter
    ]);

    expect(filteredCoordinateurs.length).toBe(3);
  });

  it('should filter coordinateurs Départemental and Bassin de vie', async (): Promise<void> => {
    const coordinateursFilter: CoordinateursFilterPresentation = { perimetre: ['Départemental', 'Bassin de vie'] };

    const coordinateurs: { perimetre: PerimetrePresentation }[] = [
      { perimetre: 'Départemental' },
      { perimetre: 'Bassin de vie' },
      { perimetre: 'Bassin de vie' },
      { perimetre: 'Bassin de vie' },
      { perimetre: 'Départemental' },
      { perimetre: 'Départemental' },
      { perimetre: 'Départemental' }
    ];

    const filteredCoordinateurs: { perimetre: PerimetrePresentation }[] = toFilteredCoordinateurs([
      coordinateurs,
      coordinateursFilter
    ]);

    expect(filteredCoordinateurs.length).toBe(0);
  });
});

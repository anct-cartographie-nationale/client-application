import { PerimetrePresentation } from './perimetre';
import { CoordinateursFilterPresentation } from './filter.presentation';

type HasPerimeterPresentation = { perimetre: PerimetrePresentation };

export const DEFAULT_FILTER: CoordinateursFilterPresentation = { perimetre: [] };

export const onlyDepartemental = (coordinateur: HasPerimeterPresentation): boolean =>
  coordinateur.perimetre === 'Départemental';

export const onlyBassinDeVie = (coordinateur: HasPerimeterPresentation): boolean => coordinateur.perimetre === 'Bassin de vie';

const perimetreFilterMap: Map<string, <T extends HasPerimeterPresentation>(coordinateurs: T[]) => T[]> = new Map<
  string,
  <T extends HasPerimeterPresentation>(coordinateurs: T[]) => T[]
>([
  ['Départemental', <T extends HasPerimeterPresentation>(coordinateurs: T[]) => coordinateurs.filter(onlyDepartemental)],
  ['Bassin de vie', <T extends HasPerimeterPresentation>(coordinateurs: T[]) => coordinateurs.filter(onlyBassinDeVie)]
]);

const applyPerimetreFiltersTo = <T extends HasPerimeterPresentation>(
  filteredCoordinateurs: T[],
  perimetre: PerimetrePresentation
): T[] => perimetreFilterMap.get(perimetre)?.(filteredCoordinateurs) ?? filteredCoordinateurs;

export const toFilteredCoordinateurs = <T extends HasPerimeterPresentation>([coordinateurs, filter]: [
  T[],
  CoordinateursFilterPresentation
]): T[] => filter.perimetre.reduce(applyPerimetreFiltersTo, coordinateurs);

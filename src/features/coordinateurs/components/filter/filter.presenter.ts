import { PerimetrePresentation } from '../../presenters';

const DEFAULT_PERIMETRE_SELECTION: PerimetrePresentation[] = ['Départemental', 'Bassin de vie'];

const notInPerimetreSelection =
  (perimetreSelected: PerimetrePresentation) =>
  (perimetreInverted: PerimetrePresentation): boolean =>
    perimetreInverted === perimetreSelected;

const toInvertedPerimetreSelection = (
  invertedPerimetres: PerimetrePresentation[],
  selectedPerimetre: PerimetrePresentation
): PerimetrePresentation[] => invertedPerimetres.filter(notInPerimetreSelection(selectedPerimetre));

export const invertPerimetreSelection = (filter: PerimetrePresentation[]): PerimetrePresentation[] =>
  filter.reduce(toInvertedPerimetreSelection, DEFAULT_PERIMETRE_SELECTION);

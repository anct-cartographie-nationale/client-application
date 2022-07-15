import { isSiret, Siret } from '../siret/siret';
import { isRna, Rna } from '../rna/rna';

export class PivotError extends Error {
  constructor(pivot: string) {
    super(`Le Pivot ${pivot} n'est pas valide`);
  }
}

export type Pivot = Siret | Rna;

const throwPivotError = (pivot: string): Pivot => {
  throw new PivotError(pivot);
};

export const Pivot = (pivot: string): Pivot => (isSiret(pivot) || isRna(pivot) ? pivot : throwPivotError(pivot));

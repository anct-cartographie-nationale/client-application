import { Model } from '../model';

export class RnaError extends Error {
  constructor(rna: string) {
    super(`Le Rna ${rna} n'est pas valide`);
  }
}

export type Rna = Model<'Rna', string>;

const throwRnaError = (rnaNumber: string): Rna => {
  throw new RnaError(rnaNumber);
};

const rnaRegEx = /^W[a-zA-Z0-9]{9}$/;

export const isRna = (rna: string): rna is Rna => rnaRegEx.test(rna);

export const Rna = (rna: string): Rna => (isRna(rna) ? rna : throwRnaError(rna));

import { Model } from '../model';

export class SiretError extends Error {
  constructor(siret: string) {
    super(`Le Siret ${siret} n'est pas valide`);
  }
}

export type Siret = Model<'Siret', string>;

const throwSiretError = (siretNumber: string): Siret => {
  throw new SiretError(siretNumber);
};

const hasSiretLength = (siretNumber: string) => siretNumber.length === 14;

export const Siret = (siretNumber: string) =>
  hasSiretLength(siretNumber) ? (siretNumber as Siret) : throwSiretError(siretNumber);

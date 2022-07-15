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

export const isSiret = (siret: string): siret is Siret => siret.length === 14;

export const Siret = (siret: string): Siret => (isSiret(siret) ? siret : throwSiretError(siret));

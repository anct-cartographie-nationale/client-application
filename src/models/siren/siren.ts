import { Model } from '../model';

export class SirenError extends Error {
  public constructor(siren: string) {
    super(`Le siren ${siren} n'est pas valide`);
  }
}

export type Siren = Model<'Siren', string>;

const throwSirenError = (sirenData: string): Siren => {
  throw new SirenError(sirenData);
};

const isSiren = (sirenData: string): sirenData is Siren => sirenData.length === 9;

export const Siren = (sirenData: string): Siren => (isSiren(sirenData) ? sirenData : throwSirenError(sirenData));

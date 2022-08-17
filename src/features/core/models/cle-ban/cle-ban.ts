import { Model } from '../model';

export class CleBanError extends Error {
  constructor(cleBan: string) {
    super(`Le CleBan ${cleBan} n'est pas valide`);
  }
}

export type CleBan = Model<'CleBan', string>;

const throwCleBanError = (cleBanNumber: string): CleBan => {
  throw new CleBanError(cleBanNumber);
};

const cleBanRegEx = /^\d[\dAB]\d{3}_[a-z\d]{4,}_\d{5}$/;

export const isCleBan = (cleBan: string): cleBan is CleBan => cleBanRegEx.test(cleBan);

export const CleBan = (cleBan: string): CleBan => (isCleBan(cleBan) ? cleBan : throwCleBanError(cleBan));

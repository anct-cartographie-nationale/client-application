import { Model } from '../model';
import { OptionalPropertyError } from '../../features/cartographie/infrastructure/utilities';

export type Adresse = Model<
  'Adresse',
  {
    voie: string;
    complement_adresse?: string;
    code_postal: string;
    code_insee?: string;
    commune: string;
  }
>;

export class CodePostalError extends OptionalPropertyError {
  constructor(codePostal: string) {
    super('codePostal', `Le code postal ${codePostal} n'est pas valide`);
  }
}

export class CodeInseeError extends OptionalPropertyError {
  constructor(codeInsee: string) {
    super('codeInsee', `Le code insee ${codeInsee} n'est pas valide`);
  }
}

export class CommuneError extends OptionalPropertyError {
  constructor(commune: string) {
    super('commune', `La commune ${commune} contient des caractères invalides`);
  }
}

const codePostalRegExp: RegExp = /^\d{5}$/;

const codeInseeRegExp: RegExp = /^\d[\dAB](?:0?\d{3}|-\d-\d{2}-\d{3})$/;

const communeRegExp: RegExp = /^[A-Za-z\dÀ-ú-'’ ]+$/;

const isValidCodePostal = (codePostal: string): boolean => codePostalRegExp.test(codePostal);

const isValidCodeInsee = (codeInsee: string): boolean => codeInseeRegExp.test(codeInsee);

const isValidCommune = (commune: string): boolean => communeRegExp.test(commune);

export const isValidAddress = (adresse: Omit<Adresse, 'isAdresse'>): adresse is Adresse =>
  isValidCodePostal(adresse.code_postal) &&
  (adresse.code_insee == null || isValidCodeInsee(adresse.code_insee)) &&
  isValidCommune(adresse.commune);

const throwAdresseError = (adresse: Omit<Adresse, 'isAdresse'>): Adresse => {
  if (!isValidCodePostal(adresse.code_postal)) {
    throw new CodePostalError(adresse.code_postal ?? 'indéfini');
  }

  if (adresse.code_insee && !isValidCodeInsee(adresse.code_insee)) {
    throw new CodeInseeError(adresse.code_insee ?? 'indéfini');
  }

  if (!isValidCommune(adresse.commune)) {
    throw new CommuneError(adresse.commune ?? 'indéfini');
  }

  throw new Error();
};

export const Adresse = (adresse: Omit<Adresse, 'isAdresse'>): Adresse =>
  isValidAddress(adresse) ? { ...adresse } : throwAdresseError(adresse);

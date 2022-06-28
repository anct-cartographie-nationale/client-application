import { Model } from '../model';

export class CodePostalError extends Error {
  constructor(codePostal: string) {
    super(`Le code postal ${codePostal} n'est pas valide`);
  }
}

export class CodeInseeError extends Error {
  constructor(codeInsee: string) {
    super(`Le code insee ${codeInsee} n'est pas valide`);
  }
}

export class CommuneError extends Error {
  constructor(commune: string) {
    super(`La commune ${commune} contient des caractères invalides`);
  }
}

export const Adresse = (adresseData: Omit<Adresse, 'isAdresse'>): Adresse => {
  const codePostalRegEx = /^\d{5}$/;
  const codeInseeRegEx = /^\d[\dAB](?:0?\d{3}|-\d-\d{2}-\d{3})$/;
  const communeRegEx = /^[A-zÀ-ú- ]+$/;

  if (!codePostalRegEx.test(adresseData.code_postal)) {
    throw new CodePostalError(adresseData.code_postal);
  }

  if (!codeInseeRegEx.test(adresseData.code_insee)) {
    throw new CodeInseeError(adresseData.code_insee);
  }

  if (!communeRegEx.test(adresseData.commune)) {
    throw new CommuneError(adresseData.commune);
  }

  return { ...adresseData } as Adresse;
};

export type Adresse = Model<
  'Adresse',
  {
    voie: string;
    complement_adresse?: string;
    code_postal: string;
    code_insee: string;
    commune: string;
  }
>;

import codePostalNotMatchingCodeDepartement from './code-postal-not-matching-code-departement.json';
import { LieuMediationNumeriquePresentation } from '../../../core';

const codePostalNotMatchingCodeDepartementMap: Map<string, string> = new Map<string, string>(
  codePostalNotMatchingCodeDepartement as []
);

const isInCorseDuSud = (codePostal: string): boolean => codePostal.startsWith('201') || codePostal.startsWith('200');

const getCorseCodeDepartement = (codePostal: string): string => (isInCorseDuSud(codePostal) ? '2A' : '2B');

const isInCorse = (codePostal: string): boolean => codePostal.startsWith('20');

const convertEdgeCasesToCodeInsee = (codePostal: string): string =>
  codePostalNotMatchingCodeDepartementMap.get(codePostal) ?? codePostal;

const codeDepartementFromCodePostal = (codePostal: string) =>
  isInCorse(codePostal) ? getCorseCodeDepartement(codePostal) : convertEdgeCasesToCodeInsee(codePostal).slice(0, 2);

const codeDepartementFromCodeInsee = (codeInsee: string) => codeInsee.slice(0, 2);

export const toCodeDepartement = (lieuDeMediationNumerique: LieuMediationNumeriquePresentation): string => {
  return lieuDeMediationNumerique.adresse.code_insee
    ? codeDepartementFromCodeInsee(lieuDeMediationNumerique.adresse.code_insee)
    : codeDepartementFromCodePostal(lieuDeMediationNumerique.adresse.code_postal);
};

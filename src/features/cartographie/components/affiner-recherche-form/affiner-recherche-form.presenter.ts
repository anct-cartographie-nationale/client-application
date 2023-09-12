import { LabelNational } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LieuMediationNumeriquePresentation } from '../../../core/presenters';

export const isQPV: RegExp = /(?:^|;)(QPV)(?:;|$)/g;
export const isZRR: RegExp = /(?:^|;)(ZRR)(?:;|$)/g;

const toLabelNationaux = (lieuMediationNumerique: LieuMediationNumeriquePresentation): LabelNational[] =>
  lieuMediationNumerique.labels_nationaux ?? [];

const toLabelsAutre = (lieuMediationNumerique: LieuMediationNumeriquePresentation): string[] =>
  lieuMediationNumerique.labels_autres ?? [];

const deduplicate = <T>(duplicates: T[]): T[] => Array.from(new Set(duplicates));

export const labelNationauxFrom = (LieuxMediationNumerique: LieuMediationNumeriquePresentation[]): LabelNational[] =>
  deduplicate(LieuxMediationNumerique.flatMap(toLabelNationaux));

export const labelsAutresFrom = (LieuxMediationNumerique: LieuMediationNumeriquePresentation[]): string[] =>
  deduplicate(LieuxMediationNumerique.flatMap(toLabelsAutre));

export const strategiesTerritorialesFrom = (LieuxMediationNumerique: LieuMediationNumeriquePresentation[]): string[] =>
  labelsAutresFrom(LieuxMediationNumerique).filter((autreLabel: string) => isQPV.test(autreLabel) || isZRR.test(autreLabel));

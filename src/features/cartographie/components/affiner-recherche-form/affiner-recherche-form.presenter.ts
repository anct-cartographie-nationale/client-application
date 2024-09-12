import { DispositifProgrammeNational, FormationLabel, Service } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LieuMediationNumeriquePresentation } from '../../../core/presenters';

const toDispositifProgrammesNationaux = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation
): DispositifProgrammeNational[] => lieuMediationNumerique.dispositif_programmes_nationaux ?? [];

const toFormationsLabels = (lieuMediationNumerique: LieuMediationNumeriquePresentation): FormationLabel[] =>
  lieuMediationNumerique.formations_labels ?? [];

const toAutresFormationsLabels = (lieuMediationNumerique: LieuMediationNumeriquePresentation): string[] =>
  lieuMediationNumerique.autres_formations_labels ?? [];

const toServices = (lieuMediationNumerique: LieuMediationNumeriquePresentation): Service[] =>
  lieuMediationNumerique.services ?? [];

const deduplicate = <T>(duplicates: T[]): T[] => Array.from(new Set(duplicates));

export const dispositifProgrammesNationauxFrom = (
  LieuxMediationNumerique: LieuMediationNumeriquePresentation[]
): DispositifProgrammeNational[] => deduplicate(LieuxMediationNumerique.flatMap(toDispositifProgrammesNationaux));

export const formationsLabelsFrom = (LieuxMediationNumerique: LieuMediationNumeriquePresentation[]): FormationLabel[] =>
  deduplicate(LieuxMediationNumerique.flatMap(toFormationsLabels));

export const autresFormationsLabelsFrom = (LieuxMediationNumerique: LieuMediationNumeriquePresentation[]): string[] =>
  deduplicate(LieuxMediationNumerique.flatMap(toAutresFormationsLabels));

export const servicesFrom = (LieuxMediationNumerique: LieuMediationNumeriquePresentation[]): Service[] =>
  deduplicate(LieuxMediationNumerique.flatMap(toServices));

export const strategiesTerritorialesFrom = (LieuxMediationNumerique: LieuMediationNumeriquePresentation[]): string[] =>
  autresFormationsLabelsFrom(LieuxMediationNumerique).filter(
    (autreLabel: string) => autreLabel === 'QPV' || autreLabel === 'ZRR'
  );

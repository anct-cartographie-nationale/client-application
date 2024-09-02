import { DispositifProgrammeNational } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LieuMediationNumeriquePresentation } from '../../../core/presenters';

const toDispositifProgrammesNationaux = (
  lieuMediationNumerique: LieuMediationNumeriquePresentation
): DispositifProgrammeNational[] => lieuMediationNumerique.dispositif_programmes_nationaux ?? [];

const toAutresFormationsLabels = (lieuMediationNumerique: LieuMediationNumeriquePresentation): string[] =>
  lieuMediationNumerique.autres_formations_labels ?? [];

const deduplicate = <T>(duplicates: T[]): T[] => Array.from(new Set(duplicates));

export const dispositifProgrammesNationauxFrom = (
  LieuxMediationNumerique: LieuMediationNumeriquePresentation[]
): DispositifProgrammeNational[] => deduplicate(LieuxMediationNumerique.flatMap(toDispositifProgrammesNationaux));

export const autresFormationsLabelsFrom = (LieuxMediationNumerique: LieuMediationNumeriquePresentation[]): string[] =>
  deduplicate(LieuxMediationNumerique.flatMap(toAutresFormationsLabels));

export const strategiesTerritorialesFrom = (LieuxMediationNumerique: LieuMediationNumeriquePresentation[]): string[] =>
  autresFormationsLabelsFrom(LieuxMediationNumerique).filter(
    (autreLabel: string) => autreLabel === 'QPV' || autreLabel === 'ZRR'
  );

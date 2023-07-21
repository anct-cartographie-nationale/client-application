import { LabelNational } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LieuMediationNumeriquePresentation } from '../../../core/presenters';

const toLabelNationaux = (lieuMediationNumerique: LieuMediationNumeriquePresentation): LabelNational[] =>
  lieuMediationNumerique.labels_nationaux ?? [];

const deduplicate = <T>(duplicates: T[]): T[] => Array.from(new Set(duplicates));

export const labelNationauxFrom = (LieuxMediationNumerique: LieuMediationNumeriquePresentation[]): LabelNational[] =>
  deduplicate(LieuxMediationNumerique.flatMap(toLabelNationaux));

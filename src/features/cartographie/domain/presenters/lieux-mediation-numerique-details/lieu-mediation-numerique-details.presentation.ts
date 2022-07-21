import { LieuMediationNumerique } from 'projects/client-application/src/models';
import { HorairesPresentation } from '../horaires/horaires.presentation';

export type LieuMediationNumeriqueDetailsPresentation = Omit<LieuMediationNumerique, 'horaires' | 'typologie' | 'adresse'> & {
  horaires?: HorairesPresentation;
  typologie?: string;
  adresse: string;
};

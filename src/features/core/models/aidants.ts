import {
  Model,
  CourrielError,
  TelephoneError,
  LieuMediationNumerique,
  isValidCourriel,
  isValidTelephone
} from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LieuMediationNumeriqueWithNoPublic } from './no-public';

export type Aidant = Model<
  'Aidant',
  {
    nom: string;
    telephone?: string;
    courriel?: string;
  }
>;

export type Aidants = Aidant[];

export type LieuMediationNumeriqueWithAidants = LieuMediationNumeriqueWithNoPublic &
  LieuMediationNumerique & {
    aidants?: Aidants;
  };

const throwAidantError = (aidant: Omit<Aidant, 'isAidant'>): Aidant => {
  if (aidant.courriel && !isValidCourriel(aidant.courriel)) {
    throw new CourrielError(aidant?.courriel ?? 'indéfini');
  }

  if (aidant.telephone && !isValidTelephone(aidant.telephone)) {
    throw new TelephoneError(aidant?.telephone ?? 'indéfini');
  }

  throw new Error();
};

const isValidAidant = (aidant: Omit<Aidant, 'isAidant'>): aidant is Aidant =>
  (aidant.courriel == null || isValidCourriel(aidant.courriel)) &&
  (aidant.telephone == null || isValidTelephone(aidant.telephone));

export const Aidant = (aidant: Omit<Aidant, 'isAidant'>): Aidant => {
  return isValidAidant(aidant) ? aidant : throwAidantError(aidant);
};

export const Aidants = (aidants: Omit<Aidant, 'isAidant'>[]): Aidants => aidants.map(Aidant);

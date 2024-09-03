import { Frais, DispositifProgrammeNational } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LieuMediationNumeriquePresentation, openingState } from '../../../core/presenters';
import { ifAny } from '../../../core/utilities';
import { toCourrielsWithCC } from '../courriels';
import {
  LieuMediationNumeriqueListItemPresentation,
  LieuMediationNumeriqueListItemPresentationFraisACharge
} from './lieu-mediation-numerique-list-item.presentation';

const capitalize = (stringToCapitalize: string): string =>
  `${stringToCapitalize[0].toUpperCase()}${stringToCapitalize.toLowerCase().substring(1)}`;

const onlyWithLetters = (word: string): boolean => word.length > 0;

const capitalizeWords = (phraseToCapitalize: string): string =>
  phraseToCapitalize.split(' ').filter(onlyWithLetters).map(capitalize).join(' ');

const complementAdresseIfAny = (complementAdresse?: string): string =>
  complementAdresse ? capitalize(complementAdresse) + ', ' : '';

const formatVoie = (lieuMediationNumerique: LieuMediationNumeriquePresentation): string =>
  `${complementAdresseIfAny(lieuMediationNumerique.complement_adresse)}${capitalizeWords(lieuMediationNumerique.voie)}`;

const formatAdresse = (lieuMediationNumerique: LieuMediationNumeriquePresentation): string =>
  `${formatVoie(lieuMediationNumerique)} ${lieuMediationNumerique.code_postal}, ${capitalize(lieuMediationNumerique.commune)}`;

const toListItemLabelsNationaux = (
  dispositifProgrammesNationaux?: DispositifProgrammeNational[]
): DispositifProgrammeNational[] | undefined =>
  dispositifProgrammesNationaux?.filter(
    (labelNational: DispositifProgrammeNational) =>
      labelNational === DispositifProgrammeNational.ConseillersNumeriques ||
      labelNational === DispositifProgrammeNational.FranceServices ||
      labelNational === DispositifProgrammeNational.AidantsConnect
  );

const toListItemConditionsAcces = (
  conditionsAcces?: Frais[]
): LieuMediationNumeriqueListItemPresentationFraisACharge | undefined =>
  conditionsAcces?.map((frais: Frais): LieuMediationNumeriqueListItemPresentationFraisACharge => {
    switch (frais) {
      case Frais.Gratuit:
        return { label: 'Gratuit', isFree: true };
      case Frais.Payant:
        return { label: 'Payant', isFree: false };
      case Frais.GratuitSousCondition:
        return { label: 'Gratuit sous condition', isFree: false };
    }
  })?.[0];

export const toLieuxMediationNumeriqueListItemsPresentation =
  (date: Date) =>
  (lieuxMediationNumerique: LieuMediationNumeriquePresentation[]): LieuMediationNumeriqueListItemPresentation[] =>
    lieuxMediationNumerique.map((lieuMediationNumerique: LieuMediationNumeriquePresentation) => ({
      id: lieuMediationNumerique.id,
      nom: lieuMediationNumerique.nom,
      adresse: formatAdresse(lieuMediationNumerique),
      latitude: lieuMediationNumerique.latitude,
      longitude: lieuMediationNumerique.longitude,
      date_maj: lieuMediationNumerique.date_maj,
      ...ifAny('telephone', lieuMediationNumerique.telephone),
      ...ifAny('courriels', toCourrielsWithCC(lieuMediationNumerique.courriels)),
      ...ifAny('site_web', lieuMediationNumerique.site_web),
      ...ifAny(
        'dispositif_programmes_nationaux',
        toListItemLabelsNationaux(lieuMediationNumerique.dispositif_programmes_nationaux)
      ),
      ...ifAny('frais_a_charge', toListItemConditionsAcces(lieuMediationNumerique.frais_a_charge)),
      ...ifAny('distance', lieuMediationNumerique.distance),
      ...ifAny('prise_rdv', lieuMediationNumerique.prise_rdv),
      ...ifAny('status', openingState(date)(lieuMediationNumerique.horaires)),
      ...ifAny('prive', lieuMediationNumerique.prive)
    }));

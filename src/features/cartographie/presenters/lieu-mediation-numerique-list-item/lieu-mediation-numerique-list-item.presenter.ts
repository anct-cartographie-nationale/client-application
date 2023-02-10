import { ConditionAcces, LabelNational } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { ifAny, LieuMediationNumeriquePresentation, openingState } from '../../../core';
import {
  LieuMediationNumeriqueListItemPresentation,
  LieuMediationNumeriqueListItemPresentationConditionsAcces
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

const toListItemLabelsNationaux = (labelsNationaux?: LabelNational[]): LabelNational[] | undefined =>
  labelsNationaux?.filter(
    (labelNational: LabelNational) => labelNational === LabelNational.CNFS || labelNational === LabelNational.FranceServices
  );

const toListItemConditionsAcces = (
  conditionsAcces?: ConditionAcces[]
): LieuMediationNumeriqueListItemPresentationConditionsAcces | undefined =>
  conditionsAcces?.map((conditionAcces: ConditionAcces): LieuMediationNumeriqueListItemPresentationConditionsAcces => {
    switch (conditionAcces) {
      case ConditionAcces.Gratuit:
        return { label: 'Gratuit', isFree: true };
      case ConditionAcces.Payant:
        return { label: 'Payant', isFree: false };
      case ConditionAcces.GratuitSousCondition:
        return { label: 'Gratuit sous condition', isFree: false };
      case ConditionAcces.Adhesion:
        return { label: 'Adhésion', isFree: false };
      case ConditionAcces.AccepteLePassNumerique:
        return { label: 'Pass Numérique', isFree: false };
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
      ...ifAny('courriel', lieuMediationNumerique.courriel),
      ...ifAny('site_web', lieuMediationNumerique.site_web),
      ...ifAny('labels_nationaux', toListItemLabelsNationaux(lieuMediationNumerique.labels_nationaux)),
      ...ifAny('conditions_acces', toListItemConditionsAcces(lieuMediationNumerique.conditions_acces)),
      ...ifAny('distance', lieuMediationNumerique.distance),
      ...ifAny('status', openingState(date)(lieuMediationNumerique.horaires))
    }));

import {
  Adresse,
  CleBan,
  Contact,
  LabelNational,
  LieuMediationNumerique,
  Localisation,
  ConditionAccess,
  Presentation,
  PublicAccueilli,
  ModalitesAccompagnement,
  Typologie,
  Url,
  Pivot,
  isValidLocalisation,
  isValidAddress,
  ifAny,
  ifAnyInObject,
  ignoreInvalidPropertiesOf,
  ignoreInvalidValueOf
} from '../../../core';

export interface LieuMediationNumeriqueTransfer {
  id: string;
  pivot?: string;
  nom: string;
  commune: string;
  code_postal: string;
  code_insee?: string;
  adresse: string;
  complement_adresse?: string;
  latitude?: number;
  longitude?: number;
  cle_ban?: string;
  typologie?: string;
  telephone?: string;
  courriel?: string;
  site_web?: string;
  horaires?: string;
  presentation_resumee?: string;
  presentation_detail?: string;
  source?: string;
  structure_parente?: string;
  date_maj?: string;
  services: string;
  publics_accueillis?: string;
  conditions_access?: string;
  labels_nationaux?: string;
  labels_autres?: string;
  modalites_accompagnement?: string;
  accessibilite?: string;
  prise_rdv?: string;
}

export interface AidantTransfer {
  nom: string;
  courriel?: string;
  telephone?: string;
}

const toArray = <T extends string>(stringArray: string) => stringArray.split(/,\s*/) as T[];

const adressePayload = (lieuMediationNumeriqueTransfer: LieuMediationNumeriqueTransfer) => ({
  commune: lieuMediationNumeriqueTransfer.commune,
  code_postal: lieuMediationNumeriqueTransfer.code_postal,
  ...ifAny('code_insee', lieuMediationNumeriqueTransfer.code_insee),
  voie: lieuMediationNumeriqueTransfer.adresse,
  ...ifAny('complement_adresse', lieuMediationNumeriqueTransfer.complement_adresse)
});

const contactPayload = (lieuMediationNumeriqueTransfer: LieuMediationNumeriqueTransfer) => ({
  ...ifAny('courriel', lieuMediationNumeriqueTransfer.courriel),
  ...ifAny('telephone', lieuMediationNumeriqueTransfer.telephone),
  ...ifAny<Url[], string>(
    'site_web',
    lieuMediationNumeriqueTransfer.site_web,
    (siteWeb: string) =>
      toArray(siteWeb)
        .map((siteWebUrl: string) => {
          try {
            return Url(siteWebUrl);
          } catch {
            return null;
          }
        })
        .filter((url: Url | null) => url !== null) as Url[]
  )
});

const allRequiredFieldsAreValid = (lieuMediationNumeriqueTransfer: LieuMediationNumeriqueTransfer) =>
  isValidLocalisation(lieuMediationNumeriqueTransfer) && isValidAddress(adressePayload(lieuMediationNumeriqueTransfer));

const toDomain = (lieuMediationNumeriqueTransfer: LieuMediationNumeriqueTransfer) =>
  ({
    id: lieuMediationNumeriqueTransfer.id,
    ...ifAny<Pivot, string>('pivot', lieuMediationNumeriqueTransfer.pivot, ignoreInvalidValueOf(Pivot)),
    nom: lieuMediationNumeriqueTransfer.nom,
    adresse: Adresse(adressePayload(lieuMediationNumeriqueTransfer)),
    localisation: Localisation({
      latitude: lieuMediationNumeriqueTransfer.latitude,
      longitude: lieuMediationNumeriqueTransfer.longitude
    }),
    ...ifAny('cle_ban', lieuMediationNumeriqueTransfer.cle_ban, CleBan),
    ...ifAny<Typologie[], string>('typologie', lieuMediationNumeriqueTransfer.typologie, toArray),
    ...ifAnyInObject('contact', ignoreInvalidPropertiesOf(contactPayload(lieuMediationNumeriqueTransfer), Contact)),
    services: toArray(lieuMediationNumeriqueTransfer.services).filter((service: string) => service !== ''),
    ...ifAny<Date, string>('date_maj', lieuMediationNumeriqueTransfer.date_maj, (dateMaj: string) => new Date(dateMaj)),
    ...ifAny<LabelNational[], string>('labels_nationaux', lieuMediationNumeriqueTransfer.labels_nationaux, toArray),
    ...ifAny<ConditionAccess[], string>('conditions_access', lieuMediationNumeriqueTransfer.conditions_access, toArray),
    ...ifAny('source', lieuMediationNumeriqueTransfer.source),
    ...ifAny('horaires', lieuMediationNumeriqueTransfer.horaires),
    ...ifAnyInObject<Presentation>('presentation', {
      ...ifAny('resumee', lieuMediationNumeriqueTransfer.presentation_resumee),
      ...ifAny('detail', lieuMediationNumeriqueTransfer.presentation_detail)
    }),
    ...ifAny('structure_parente', lieuMediationNumeriqueTransfer.structure_parente),
    ...ifAny<PublicAccueilli[], string>('publics_accueillis', lieuMediationNumeriqueTransfer.publics_accueillis, toArray),
    ...ifAny<string[], string>('labels_autres', lieuMediationNumeriqueTransfer.labels_autres, toArray),
    ...ifAny<ModalitesAccompagnement[], string>(
      'modalites_accompagnement',
      lieuMediationNumeriqueTransfer.modalites_accompagnement,
      toArray
    ),
    ...ifAny<Url, string>('accessibilite', lieuMediationNumeriqueTransfer.accessibilite, Url),
    ...ifAny<Url, string>('prise_rdv', lieuMediationNumeriqueTransfer.prise_rdv, Url)
  } as LieuMediationNumerique);

export const toLieuxMediationNumerique = (
  lieuxMediationNumeriqueTransfers: LieuMediationNumeriqueTransfer[]
): LieuMediationNumerique[] => lieuxMediationNumeriqueTransfers.filter(allRequiredFieldsAreValid).map(toDomain);

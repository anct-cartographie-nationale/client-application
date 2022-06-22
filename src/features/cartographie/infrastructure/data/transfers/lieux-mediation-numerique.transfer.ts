import { Structure } from '@gouvfr-anct/mediation-numerique';

type Typologie =
  | 'ACI'
  | 'ACIPHC'
  | 'AFPA'
  | 'AI'
  | 'ASE'
  | 'ASSO'
  | 'ASSO_CHOMEUR'
  | 'Autre'
  | 'BIB'
  | 'CAARUD'
  | 'CADA'
  | 'CAF'
  | 'CAP_EMPLOI'
  | 'CAVA'
  | 'CC'
  | 'CCAS'
  | 'CCONS'
  | 'CD'
  | 'CHRS'
  | 'CHU';

export interface LieuxMediationNumeriqueTransfer {
  id: string;
  nom: string;
  commune: string;
  code_postal: string;
  code_insee: string;
  adresse: string;
  complement_adresse?: string;
  latitude?: number;
  longitude?: number;
  typologie?: Typologie;
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
  publics?: string;
  modalites_access?: string;
  labels_nationaux?: string;
  labels_autres?: string;
  types_accompagnement?: string;
  accessibilite?: string;
  prise_rdv?: string;
}

const canDisplayOnMap = (lieuxMediationNumeriqueTransfer: LieuxMediationNumeriqueTransfer) =>
  lieuxMediationNumeriqueTransfer.latitude != null && lieuxMediationNumeriqueTransfer.longitude != null;

const contactMailIfAny = (contactMail?: string) => (contactMail ? { contactMail } : {});

const contactPhoneIfAny = (contactPhone?: string) => (contactPhone ? { contactPhone } : {});

const websiteIfAny = (website?: string) => (website ? { website } : {});

const labelsQualificationsIfAny = (labelsQualifications?: string[]) => (labelsQualifications ? { labelsQualifications } : {});

const updatedAtIfAny = (updatedAt?: string) => (updatedAt ? { updatedAt } : {});

export const toResinStructures = (lieuxMediationNumeriqueTransfers: LieuxMediationNumeriqueTransfer[]): Structure[] =>
  lieuxMediationNumeriqueTransfers.filter(canDisplayOnMap).map(
    (lieuxMediationNumeriqueTransfer: LieuxMediationNumeriqueTransfer): Structure =>
      new Structure({
        _id: lieuxMediationNumeriqueTransfer.id,
        structureName: lieuxMediationNumeriqueTransfer.nom,
        address: {
          street: lieuxMediationNumeriqueTransfer.adresse,
          commune: lieuxMediationNumeriqueTransfer.commune,
          postcode: lieuxMediationNumeriqueTransfer.code_postal,
          coordinates: [lieuxMediationNumeriqueTransfer.longitude, lieuxMediationNumeriqueTransfer.latitude]
        },
        coord: [lieuxMediationNumeriqueTransfer.longitude, lieuxMediationNumeriqueTransfer.latitude],
        ...contactPhoneIfAny(lieuxMediationNumeriqueTransfer.telephone),
        ...contactMailIfAny(lieuxMediationNumeriqueTransfer.courriel),
        ...websiteIfAny(lieuxMediationNumeriqueTransfer.site_web),
        ...labelsQualificationsIfAny(lieuxMediationNumeriqueTransfer.labels_nationaux?.split(', ')),
        ...updatedAtIfAny(lieuxMediationNumeriqueTransfer.date_maj)
      })
  );

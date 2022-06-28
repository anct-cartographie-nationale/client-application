import { Typologie } from '../../../../../models/typologie';
import { LieuMediationNumerique } from '../../../../../models/lieu-mediation-numerique/lieu-mediation-numerique';
import { Siret } from '../../../../../models/siret/siret';
import { Adresse } from '../../../../../models/adresse/adresse';
import { Localisation } from '../../../../../models/localisation/localisation';
import { Contact } from '../../../../../models/contact/contact';
import { Url } from '../../../../../models/url/url';
import { LabelNational } from '../../../../../models/labels-nationaux';
import { ModalitesAccess } from '../../../../../models/modalites-access';
import { Presentation } from '../../../../../models/presentation';
import { Siren } from '../../../../../models/siren/siren';
import { Public } from '../../../../../models/public';
import { TypeAccompagnement } from '../../../../../models/type-accompagnement';
import { ifAny, ifAnyInObject } from '../../utilities/if-any';

export interface LieuMediationNumeriqueTransfer {
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

const toArray = <T extends string>(stringArray: string) => stringArray.split(', ') as T[];

const canDisplayOnMap = (lieuxMediationNumeriqueTransfer: LieuMediationNumeriqueTransfer) =>
  lieuxMediationNumeriqueTransfer.latitude != null && lieuxMediationNumeriqueTransfer.longitude != null;

export const toLieuxMediationNumerique = (
  lieuxMediationNumeriqueTransfers: LieuMediationNumeriqueTransfer[]
): LieuMediationNumerique[] =>
  lieuxMediationNumeriqueTransfers.filter(canDisplayOnMap).map(
    (lieuMediationNumeriqueTransfer: LieuMediationNumeriqueTransfer) =>
      ({
        id: Siret(lieuMediationNumeriqueTransfer.id),
        nom: lieuMediationNumeriqueTransfer.nom,
        adresse: Adresse({
          commune: lieuMediationNumeriqueTransfer.commune,
          code_postal: lieuMediationNumeriqueTransfer.code_postal,
          code_insee: lieuMediationNumeriqueTransfer.code_insee,
          voie: lieuMediationNumeriqueTransfer.adresse,
          ...ifAny<string>('complement_adresse', lieuMediationNumeriqueTransfer.complement_adresse)
        }),
        ...ifAny<Typologie>('typologie', lieuMediationNumeriqueTransfer.typologie),
        ...ifAnyInObject<Contact>(
          'contact',
          Contact({
            ...ifAny<string>('courriel', lieuMediationNumeriqueTransfer.courriel),
            ...ifAny<string>('telephone', lieuMediationNumeriqueTransfer.telephone),
            ...ifAny<Url, string>('site_web', lieuMediationNumeriqueTransfer.site_web, Url)
          })
        ),
        localisation: Localisation({
          latitude: lieuMediationNumeriqueTransfer.latitude,
          longitude: lieuMediationNumeriqueTransfer.longitude
        }),
        services: lieuMediationNumeriqueTransfer.services.split(', '),
        ...ifAny<Date, string>('date_maj', lieuMediationNumeriqueTransfer.date_maj, (dateMaj: string) => new Date(dateMaj)),
        ...ifAny<LabelNational[], string>('labels_nationaux', lieuMediationNumeriqueTransfer.labels_nationaux, toArray),
        ...ifAny<ModalitesAccess[], string>('modalites_access', lieuMediationNumeriqueTransfer.modalites_access, toArray),
        ...ifAny<string>('source', lieuMediationNumeriqueTransfer.source),
        ...ifAny<string>('horaires', lieuMediationNumeriqueTransfer.horaires),
        ...ifAnyInObject<Presentation>('presentation', {
          ...ifAny<string>('resumee', lieuMediationNumeriqueTransfer.presentation_resumee),
          ...ifAny<string>('detail', lieuMediationNumeriqueTransfer.presentation_detail)
        }),
        ...ifAny<Siren, string>('structure_parente', lieuMediationNumeriqueTransfer.structure_parente, Siren),
        ...ifAny<Public[], string>('publics', lieuMediationNumeriqueTransfer.publics, toArray),
        ...ifAny<string[], string>('labels_autres', lieuMediationNumeriqueTransfer.labels_autres, toArray),
        ...ifAny<TypeAccompagnement[], string>(
          'types_accompagnement',
          lieuMediationNumeriqueTransfer.types_accompagnement,
          toArray
        ),
        ...ifAny<Url, string>('accessibilite', lieuMediationNumeriqueTransfer.accessibilite, Url),
        ...ifAny<Url, string>('prise_rdv', lieuMediationNumeriqueTransfer.prise_rdv, Url)
      } as LieuMediationNumerique)
  );

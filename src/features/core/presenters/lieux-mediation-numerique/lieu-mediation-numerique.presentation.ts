import {
  ConditionAcces,
  LabelNational,
  LieuMediationNumerique,
  Localisation,
  ModaliteAccompagnement,
  PublicAccueilli,
  Service
} from '@gouvfr-anct/lieux-de-mediation-numerique';
import { ifAny } from '../../utilities';
import { geographicDistance } from '../distance';
import { NO_LOCALISATION } from '../../models';

export type LieuMediationNumeriquePresentation = {
  id: string;
  nom: string;
  voie: string;
  complement_adresse?: string;
  code_postal: string;
  code_insee?: string;
  commune: string;
  date_maj: Date;
  services: Service[];
  latitude: number;
  longitude: number;
  telephone?: string;
  courriel?: string;
  site_web?: string;
  prise_rdv?: string;
  labels_nationaux?: LabelNational[];
  labels_autres?: string[];
  accessibilite?: string;
  modalites_accompagnement?: ModaliteAccompagnement[];
  publics_accueillis?: PublicAccueilli[];
  conditions_acces?: ConditionAcces[];
  horaires?: string;
  source?: string;
  distance?: number;
};

export type LieuMediationNumeriquePresentationWithDistance = LieuMediationNumeriquePresentation & { distance: number };

const getDistance = (lieuMediationNumerique: LieuMediationNumerique, localisation: Localisation): number | undefined =>
  lieuMediationNumerique.localisation == null || localisation === NO_LOCALISATION
    ? undefined
    : geographicDistance(lieuMediationNumerique.localisation, localisation);

export const toLieuxMediationNumeriquePresentation = (
  lieuMediationNumerique: LieuMediationNumerique & { localisation: Localisation },
  localisation: Localisation
): LieuMediationNumeriquePresentation => ({
  id: lieuMediationNumerique.id,
  nom: lieuMediationNumerique.nom,
  voie: lieuMediationNumerique.adresse.voie,
  ...ifAny('complement_adresse', lieuMediationNumerique.adresse?.complement_adresse),
  code_postal: lieuMediationNumerique.adresse.code_postal,
  ...ifAny('code_insee', lieuMediationNumerique.adresse?.code_insee),
  commune: lieuMediationNumerique.adresse.commune,
  date_maj: lieuMediationNumerique.date_maj,
  services: lieuMediationNumerique.services,
  latitude: lieuMediationNumerique.localisation.latitude,
  longitude: lieuMediationNumerique.localisation.longitude,
  ...ifAny('telephone', lieuMediationNumerique.contact?.telephone),
  ...ifAny('courriel', lieuMediationNumerique.contact?.courriel),
  ...ifAny('site_web', lieuMediationNumerique.contact?.site_web?.[0]),
  ...ifAny('prise_rdv', lieuMediationNumerique.prise_rdv),
  ...ifAny('labels_nationaux', lieuMediationNumerique.labels_nationaux),
  ...ifAny('labels_autres', lieuMediationNumerique.labels_autres),
  ...ifAny('accessibilite', lieuMediationNumerique.accessibilite),
  ...ifAny('modalites_accompagnement', lieuMediationNumerique.modalites_accompagnement),
  ...ifAny('publics_accueillis', lieuMediationNumerique.publics_accueillis),
  ...ifAny('conditions_acces', lieuMediationNumerique.conditions_acces),
  ...ifAny('horaires', lieuMediationNumerique.horaires),
  ...ifAny('distance', getDistance(lieuMediationNumerique, localisation)),
  ...ifAny('source', lieuMediationNumerique.source)
});

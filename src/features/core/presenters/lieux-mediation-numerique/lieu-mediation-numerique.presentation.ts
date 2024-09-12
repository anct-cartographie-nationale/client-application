import {
  DispositifProgrammeNational,
  FormationLabel,
  Frais,
  Itinerance,
  LieuMediationNumerique,
  Localisation,
  ModaliteAccompagnement,
  PriseEnChargeSpecifique,
  PublicSpecifiquementAdresse,
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
  services?: Service[];
  latitude: number;
  longitude: number;
  telephone?: string;
  courriels?: string[];
  site_web?: string;
  prise_rdv?: string;
  typologies?: string;
  itinerance?: Itinerance[];
  dispositif_programmes_nationaux?: DispositifProgrammeNational[];
  formations_labels?: FormationLabel[];
  autres_formations_labels?: string[];
  fiche_acces_libre?: string;
  modalites_accompagnement?: ModaliteAccompagnement[];
  publics_specifiquement_adresses?: PublicSpecifiquementAdresse[];
  prise_en_charge_specifique?: PriseEnChargeSpecifique[];
  frais_a_charge?: Frais[];
  horaires?: string;
  source?: string;
  distance?: number;
  prive?: boolean;
};

type LieuMediationNumeriqueWithNoPublic = LieuMediationNumerique & {
  prive?: boolean;
};

export type LieuMediationNumeriquePresentationWithDistance = LieuMediationNumeriquePresentation & { distance: number };

const getDistance = (lieuMediationNumerique: LieuMediationNumerique, localisation: Localisation): number | undefined =>
  lieuMediationNumerique.localisation == null || localisation === NO_LOCALISATION
    ? undefined
    : geographicDistance(lieuMediationNumerique.localisation, localisation);

export const toLieuxMediationNumeriquePresentation = (
  lieuMediationNumerique: LieuMediationNumeriqueWithNoPublic & { localisation: Localisation },
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
  ...ifAny('services', lieuMediationNumerique.services),
  latitude: lieuMediationNumerique.localisation.latitude,
  longitude: lieuMediationNumerique.localisation.longitude,
  ...ifAny('typologies', lieuMediationNumerique.typologies),
  ...ifAny('telephone', lieuMediationNumerique.contact?.telephone),
  ...ifAny('courriels', lieuMediationNumerique.contact?.courriels),
  ...ifAny('site_web', lieuMediationNumerique.contact?.site_web),
  ...ifAny('prise_rdv', lieuMediationNumerique.prise_rdv),
  ...ifAny('itinerance', lieuMediationNumerique.itinerance),
  ...ifAny('dispositif_programmes_nationaux', lieuMediationNumerique.dispositif_programmes_nationaux),
  ...ifAny('formations_labels', lieuMediationNumerique.formations_labels),
  ...ifAny('autres_formations_labels', lieuMediationNumerique.autres_formations_labels),
  ...ifAny('fiche_acces_libre', lieuMediationNumerique.fiche_acces_libre),
  ...ifAny('modalites_accompagnement', lieuMediationNumerique.modalites_accompagnement),
  ...ifAny('publics_specifiquement_adresses', lieuMediationNumerique.publics_specifiquement_adresses),
  ...ifAny('prise_en_charge_specifique', lieuMediationNumerique.prise_en_charge_specifique),
  ...ifAny('frais_a_charge', lieuMediationNumerique.frais_a_charge),
  ...ifAny('horaires', lieuMediationNumerique.horaires),
  ...ifAny('distance', getDistance(lieuMediationNumerique, localisation)),
  ...ifAny('source', lieuMediationNumerique.source),
  ...ifAny('prive', lieuMediationNumerique.prive)
});

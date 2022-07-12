import { LieuMediationNumeriqueListItemPresentation } from '../../../domain/presenters/lieux-mediation-numerique-list/lieu-mediation-numerique-list-item.presentation';
import { Structure } from '@gouvfr-anct/mediation-numerique';
import { ifAny } from '../../utilities/if-any';

// TODO: TO REMOVE
export const toStructurePresentation = (lieuMediationNumerique: LieuMediationNumeriqueListItemPresentation): Structure =>
  new Structure({
    _id: lieuMediationNumerique.id,
    structureName: lieuMediationNumerique.nom,
    address: {
      street: lieuMediationNumerique.adresse.voie,
      postcode: lieuMediationNumerique.adresse.code_postal,
      commune: lieuMediationNumerique.adresse.commune,
      coordinates: [lieuMediationNumerique.localisation.longitude, lieuMediationNumerique.localisation.latitude]
    },
    coord: [lieuMediationNumerique.localisation.longitude, lieuMediationNumerique.localisation.latitude],
    ...ifAny('contactPhone', lieuMediationNumerique.contact?.telephone),
    ...ifAny('contactMail', lieuMediationNumerique.contact?.courriel),
    ...ifAny('website', lieuMediationNumerique.contact?.site_web),
    ...ifAny('labelsQualifications', lieuMediationNumerique.labels_nationaux),
    ...ifAny('updatedAt', lieuMediationNumerique.date_maj, (date: Date) => date.toISOString())
  });

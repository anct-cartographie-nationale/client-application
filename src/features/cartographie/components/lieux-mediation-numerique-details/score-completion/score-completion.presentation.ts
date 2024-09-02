import { LieuMediationNumeriqueDetailsPresentation } from '../../../presenters';

type Join<K, P> = K extends string | number ? (P extends string | number ? `${K}.${P}` : never) : never;

type Paths<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string | number ? `${K}` | Join<K, Paths<T[K]>> : never;
    }[keyof T]
  : never;

export type ScoreCoefficientField = {
  coefficient: number;
  name: string;
  field: Paths<LieuMediationNumeriqueDetailsPresentation>;
};

export type ScorePresenceField = { presence: boolean; name: string; field: Paths<LieuMediationNumeriqueDetailsPresentation> };

export const SCORE_FIELDS: ScoreCoefficientField[] = [
  { coefficient: 2, name: 'Nom', field: 'adresse' },
  { coefficient: 2, name: 'Adresse', field: 'adresse' },
  { coefficient: 2, name: 'Commune', field: 'commune' },
  { coefficient: 2, name: 'Code postal', field: 'code_postal' },
  { coefficient: 2, name: 'Services', field: 'services' },
  { coefficient: 2, name: 'Horaires', field: 'horaires' },
  { coefficient: 2, name: 'Typologie', field: 'typologies' },
  { coefficient: 2, name: 'Téléphone', field: 'contact.telephone' },
  { coefficient: 2, name: 'Courriel', field: 'contact.courriels' },
  { coefficient: 2, name: 'Site web', field: 'contact.site_web' },
  { coefficient: 2, name: 'Présentation détaillée', field: 'presentation.detail' },
  { coefficient: 2, name: 'Présentation résumée', field: 'presentation.resume' },
  { coefficient: 2, name: 'Date de mise à jour', field: 'date_maj' },
  { coefficient: 2, name: 'Publics spécifiquement adressés', field: 'publics_specifiquement_adresses' },
  { coefficient: 2, name: 'Prise en charge spécifique', field: 'prise_en_charge_specifique' },
  { coefficient: 2, name: 'Frais à charge', field: 'frais_a_charge' },
  { coefficient: 2, name: 'Dispositifs et programmes nationaux', field: 'dispositif_programmes_nationaux' },
  { coefficient: 2, name: 'Autres labels', field: 'autres_formations_labels' },
  { coefficient: 2, name: 'Modalités d’accompagnement', field: 'modalites_accompagnement' },
  { coefficient: 1, name: 'Fiche accès libre', field: 'fiche_acces_libre' },
  { coefficient: 1, name: 'Latitude', field: 'localisation.latitude' },
  { coefficient: 1, name: 'Longitude', field: 'localisation.longitude' },
  { coefficient: 1, name: 'Prise de RDV', field: 'prise_rdv' },
  { coefficient: 1, name: 'Source', field: 'source' }
  // todo: ajouter le pivot
];

export const TOTAL_SCORE_COEFFICIENTS: number = SCORE_FIELDS.reduce(
  (totalCoefficients: number, { coefficient }: ScoreCoefficientField) => totalCoefficients + coefficient,
  0
);

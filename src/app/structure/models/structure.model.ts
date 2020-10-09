export class Structure {
  numero: string;
  date_de_creation: string;
  derniere_modification: string;
  nom_de_lusager: string;
  votre_structure_est_elle: string;
  nom_de_votre_structure: string;
  type_de_structure: string;
  description: string;
  n: string;
  voie: string;
  telephone: string;
  courriel: string;
  site_web: string;
  facebook: string;
  twitter: string;
  instagram: string;
  civilite: string;
  nom: string;
  prenom: string;
  email_contact: string;
  fonction: string;
  accessibilite_personnes_a_mobilite_reduite_pmr: boolean;
  jaccompagne_les_usagers_dans_leurs_demarches_en_ligne: boolean;
  accompagnement_des_demarches: string[];
  wifi: boolean;
  horaires: horaireStructure;
  estOuvert: boolean;
  ouvreLe: { jour: string; horaire: string };
}

export class horaireStructure {
  lundi: Jour;
  mardi: Jour;
  mercredi: Jour;
  jeudi: Jour;
  vendredi: Jour;
  samedi: Jour;
  dimanche: Jour;
}
export class Jour {
  open: boolean;
  time: [{ openning: number; closing: number }];
}

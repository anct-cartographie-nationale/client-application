export type Jour = 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi' | 'Dimanche';

export type HorairesPresentation = {
  [jour in Jour]?: string;
};

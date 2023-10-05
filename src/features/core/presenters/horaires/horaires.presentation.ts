export type Jour = 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi' | 'Dimanche';

export type HorairesPresentation = {
  [jour in Jour]?: string;
};

export type HorairesPresentationWithType = {
  type: string;
  horaires_presentation: HorairesPresentation;
};

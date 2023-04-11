export type CoordinateurDetailsPresentation = {
  id: string;
  nom: string;
  adresse: string;
  commune: string;
  courriel?: string;
  telephone?: string;
  perimetre: 'Régional' | 'Départemental' | 'Bassin de vie';
  nombreDePersonnesCoordonnees: number;
  nombreDeStructuresAvecDesPersonnesCoordonnees: number;
  dispositif: string;
  latitude: number;
  longitude: number;
};

export type ConseillerDetailsPresentation = {
  id: string;
  coordinateurId?: string;
  nom: string;
  latitude: number;
  longitude: number;
  distance: number;
};

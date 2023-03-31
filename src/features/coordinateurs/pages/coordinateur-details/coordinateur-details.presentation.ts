export type CoordinateurDetailsPresentation = {
  id: string;
  nom: string;
  adresse: string;
  commune: string;
  courriel?: string;
  telephone?: string;
  ifn: number;
  perimetre: 'Départemental' | 'Bassin de vie';
  nombreDePersonnesCoordonnees: number;
  nombreDeStructuresAvecDesPersonnesCoordonnees: number;
  dispositif: string;
  latitude: number;
  longitude: number;
};

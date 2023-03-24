export type CoordinateurDetailsPresentation = {
  id: string;
  nom: string;
  commune: string;
  adresse: string;
  courriel?: string;
  telephone?: string;
  ifn: number;
  perimetre: 'Régional' | 'Départemental' | 'Bassin de vie';
  nombreDePersonnesCoordonnees: number;
  nombreDeStructuresAvecDesPersonnesCoordonnees: number;
  dispositif: string;
};

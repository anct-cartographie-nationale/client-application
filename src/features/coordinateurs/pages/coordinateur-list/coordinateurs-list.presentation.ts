export type CoordinateursListItemPresentation = {
  id: string;
  nom: string;
  commune: string;
  perimetre: 'Régional' | 'Départemental' | 'Bassin de vie';
  nombreDePersonnesCoordonnees: number;
  dispositif: string;
};

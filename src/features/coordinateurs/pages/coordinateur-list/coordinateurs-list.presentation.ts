export type CoordinateursListItemPresentation = {
  id: string;
  nom: string;
  commune: string;
  perimetre: 'Départemental' | 'Bassin de vie';
  nombreDePersonnesCoordonnees: number;
  dispositif: string;
};

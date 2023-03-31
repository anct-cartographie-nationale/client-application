export type CoordinateursListItemPresentation = {
  id: string;
  prenom: string;
  nom: string;
  commune: string;
  codePostal: string;
  perimetre: 'Départemental' | 'Bassin de vie';
  nombreDePersonnesCoordonnees: number;
  dispositif: string;
};

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

type ConseillerCoordinateur = {
  id: string;
  nom: string;
};

type StructurePorteuse = { nom: string; adresse: string };

type LieuActivitePrincipal = { nom: string; adresse: string };

type LieuActiviteSecondaire = { nom: string; commune: string; codePostal: string };

export type ConseillerDetailsPresentation = {
  id: string;
  coordinateurs?: ConseillerCoordinateur[];
  nom: string;
  telephone?: string;
  latitude: number;
  longitude: number;
  distance: number;
  structurePorteuse: StructurePorteuse;
  lieuActivitePrincipal: LieuActivitePrincipal;
  lieuActivite: LieuActiviteSecondaire[];
};

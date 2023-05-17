type Coordinateur = {
  id: string;
  nom: string;
};

type StructurePorteuse = {
  nom: string;
  adresse: string;
};

type LieuActivitePrincipal = {
  nom: string;
  adresse: string;
};

type LieuActivite = {
  id: string;
  nom: string;
  commune: string;
  codePostal: string;
};

export type Conseiller = {
  id: string;
  coordinateurs?: Coordinateur[];
  nom: string;
  latitude: number;
  longitude: number;
  email?: string;
  telephone?: string;
  structurePorteuse: StructurePorteuse;
  lieuActivitePrincipal: LieuActivitePrincipal;
  lieuActivite?: LieuActivite[];
};

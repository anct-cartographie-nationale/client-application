type ConseillerCoordinateur = {
  id: string;
  nom: string;
};
type StructurePorteuse = { nom: string; adresse: string };

type LieuActivitePrincipal = { nom: string; adresse: string };

type LieuActiviteSecondaire = { id: string; nom: string; commune: string; codePostal: string };

export type ConseillerOnMapPresentation = {
  id: string;
  coordinateurs?: ConseillerCoordinateur[];
  nom: string;
  telephone?: string;
  latitude: number;
  longitude: number;
  structurePorteuse: StructurePorteuse;
  lieuActivitePrincipal: LieuActivitePrincipal;
  lieuActivite?: LieuActiviteSecondaire[];
};

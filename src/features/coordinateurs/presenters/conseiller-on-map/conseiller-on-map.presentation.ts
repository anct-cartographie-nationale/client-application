export type ConseillerOnMapPresentation = {
  id: string;
  coordinateurs?: {
    id: string;
    nom: string;
  }[];
  latitude: number;
  longitude: number;
};

import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';

export type FrancePresentation = {
  code: string;
  nom: string;
  regions: string[];
  zoom: number;
  lieuxCount?: number;
  localisation: Localisation;
};

export type Hub = {
  nom: string;
  source?: string;
  url?: string;
};

export type RegionPresentation = {
  code: string;
  nom: string;
  departements: string[];
  zoom: number;
  lieuxCount?: number;
  localisation: Localisation;
  hub?: Hub;
};

export type DepartementPresentation = {
  code: string;
  nom: string;
  zoom: number;
  lieuxCount?: number;
  localisation: Localisation;
};

export type TerritoirePresentation = FrancePresentation | RegionPresentation | DepartementPresentation;

export type WithLieuxCount<T> = {
  payload: T;
  lieuxCount: number;
};

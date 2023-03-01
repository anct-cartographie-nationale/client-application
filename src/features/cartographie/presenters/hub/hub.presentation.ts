type HubDepartementPresentation = {
  nom?: string;
  numero: string;
};

export type HubPresentation = {
  nom?: string;
  source?: string;
  url?: string;
  region: string;
  departements: HubDepartementPresentation[];
  lieuxCount?: number;
};

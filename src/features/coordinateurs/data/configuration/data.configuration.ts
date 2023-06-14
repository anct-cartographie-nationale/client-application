type DataCoordinateursConfiguration = {
  conseillers: string;
  coordinateurs: string;
};

export const DATA_COORDINATEURS_CONFIGURATION: DataCoordinateursConfiguration = {
  conseillers: 'https://api.conseiller-numerique.gouv.fr/coordination-conseillers',
  coordinateurs: 'https://api.conseiller-numerique.gouv.fr/coordinateurs'
};

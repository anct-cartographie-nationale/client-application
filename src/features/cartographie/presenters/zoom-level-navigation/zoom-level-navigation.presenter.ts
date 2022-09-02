export const REGION_ZOOM_LEVEL: number = 7;
export const DEPARTEMENT_ZOOM_LEVEL: number = 9;
export const LIEUX_ZOOM_LEVEL: number = 10;

const REGIONS_ROUTE: string = 'regions';
const DEPARTEMENTS_ROUTE: string = 'departements';
const LIEUX_ROUTE: string = '.';

const inRegionZoomLevel = (zoomLevel: number) => zoomLevel <= REGION_ZOOM_LEVEL;
export const inLieuxZoomLevel = (zoomLevel: number) => zoomLevel > DEPARTEMENT_ZOOM_LEVEL;

export const getNextRouteFromZoomLevel = (currentZoomLevel: number) => {
  if (inRegionZoomLevel(currentZoomLevel)) return REGIONS_ROUTE;
  if (inLieuxZoomLevel(currentZoomLevel)) return LIEUX_ROUTE;

  return DEPARTEMENTS_ROUTE;
};

const isRegion = (route: string, routeConfigPath: string): boolean => route === REGIONS_ROUTE && routeConfigPath !== 'regions';

const isDepartement = (route: string, routeConfigPath: string): boolean =>
  route === DEPARTEMENTS_ROUTE && !['regions/:nomRegion', 'departements'].includes(routeConfigPath);

const isLieux = (route: string, routeConfigPath: string): boolean =>
  route === LIEUX_ROUTE && !['regions/:nomRegion/:nomDepartement', ':id'].includes(routeConfigPath);

export const shouldNavigateToListPage = (route: string, routeConfigPath?: string): boolean =>
  routeConfigPath != null &&
  (isDepartement(route, routeConfigPath) || isRegion(route, routeConfigPath) || isLieux(route, routeConfigPath));

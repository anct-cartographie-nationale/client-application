export const REGION_ZOOM_LEVEL: number = 7;
export const DEPARTEMENT_ZOOM_LEVEL: number = 9;
export const LIEUX_ZOOM_LEVEL: number = 10;
export const FAR_ZOOM_LEVEL: number = 11;
export const NEAR_ZOOM_LEVEL: number = 13;

const REGIONS_ROUTE: string = 'regions';
const LIEUX_ROUTE: string = '.';

const inRegionZoomLevel = (zoomLevel: number) => zoomLevel <= REGION_ZOOM_LEVEL;
export const inLieuxZoomLevel = (zoomLevel: number) => zoomLevel > DEPARTEMENT_ZOOM_LEVEL;
export const inDepartementZoomLevel = (zoomLevel: number) => !inRegionZoomLevel(zoomLevel) && !inLieuxZoomLevel(zoomLevel);

export const getNextRouteFromZoomLevel = (currentZoomLevel: number, nearestRegion?: string): string[] => {
  if (inLieuxZoomLevel(currentZoomLevel)) return [LIEUX_ROUTE];
  if (inDepartementZoomLevel(currentZoomLevel) && nearestRegion) return [REGIONS_ROUTE, nearestRegion];

  return [REGIONS_ROUTE];
};

const isRegion = (route: string[], routeConfigPath: string): boolean =>
  route[0] === REGIONS_ROUTE && routeConfigPath !== 'regions';

const isDepartement = (route: string[], routeConfigPath: string): boolean =>
  route.length > 1 && route[0] === REGIONS_ROUTE && routeConfigPath !== 'regions/:nomRegion';

const isLieux = (route: string[], routeConfigPath: string): boolean =>
  route[0] === LIEUX_ROUTE && !['regions/:nomRegion/:nomDepartement', ':id'].includes(routeConfigPath);

export const shouldNavigateToListPage = (route: string[], routeConfigPath?: string): boolean =>
  routeConfigPath != null &&
  (isRegion(route, routeConfigPath) || isDepartement(route, routeConfigPath) || isLieux(route, routeConfigPath));

export const zoomLevelFromAreaDistance = (distance: number): number => {
  if (distance === 0) return LIEUX_ZOOM_LEVEL;
  if (distance <= 5000) return NEAR_ZOOM_LEVEL;
  if (distance <= 20000) return FAR_ZOOM_LEVEL;
  return LIEUX_ZOOM_LEVEL;
};

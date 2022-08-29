export const REGION_ZOOM_LEVEL: number = 7;
export const DEPARTEMENT_ZOOM_LEVEL: number = 10;

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

const isRegion = (route: string, pageName: string): boolean => route === REGIONS_ROUTE && pageName !== 'RegionsPage';

const isDepartement = (route: string, pageName: string): boolean =>
  route === DEPARTEMENTS_ROUTE && pageName !== 'DepartementsPage';

const isLieux = (route: string, pageName: string): boolean =>
  route === LIEUX_ROUTE && pageName !== 'LieuxMediationNumeriqueListPage';

export const shouldNavigateToListPage = (route: string, pageName?: string): boolean =>
  pageName != null && (isDepartement(route, pageName) || isRegion(route, pageName) || isLieux(route, pageName));

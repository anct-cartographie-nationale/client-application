export const REGION_ZOOM_LEVEL: number = 7;
export const DEPARTEMENT_ZOOM_LEVEL: number = 10;

export const inRegionZoomLevel = (zoomLevel: number) => zoomLevel <= REGION_ZOOM_LEVEL;
export const inLieuxZoomLevel = (zoomLevel: number) => zoomLevel > DEPARTEMENT_ZOOM_LEVEL;
export const inDepartementZoomLevel = (zoomLevel: number) => !inLieuxZoomLevel(zoomLevel) && !inRegionZoomLevel(zoomLevel);

export const getNextRouteFromZoomLevel = (currentZoomLevel: number, previousZoomLevel: number) => {
  if (inRegionZoomLevel(currentZoomLevel) && !inRegionZoomLevel(previousZoomLevel)) return 'regions';
  if (inDepartementZoomLevel(currentZoomLevel) && !inDepartementZoomLevel(previousZoomLevel)) return 'departements';
  if (inLieuxZoomLevel(currentZoomLevel) && !inLieuxZoomLevel(previousZoomLevel)) return '..';

  return '';
};

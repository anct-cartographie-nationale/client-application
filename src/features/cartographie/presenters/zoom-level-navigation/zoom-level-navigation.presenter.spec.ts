import { REGION_ZOOM_LEVEL, DEPARTEMENT_ZOOM_LEVEL, getNextRouteFromZoomLevel } from './zoom-level-navigation.presenter';

describe('zoom level navigation presenter', (): void => {
  it('should get regions when current zoom level is region and previous zoom level is different from region', (): void => {
    const nextRoute: string = getNextRouteFromZoomLevel(REGION_ZOOM_LEVEL, DEPARTEMENT_ZOOM_LEVEL);

    expect(nextRoute).toStrictEqual('regions');
  });

  it('should get empty string when current zoom level is region and previous zoom level is region too', (): void => {
    const previousZoomLevel: number = 5;
    const nextRoute: string = getNextRouteFromZoomLevel(REGION_ZOOM_LEVEL, previousZoomLevel);

    expect(nextRoute).toStrictEqual('');
  });

  it('should get departements when current zoom level is departement and previous zoom level is region zoom level', (): void => {
    const nextRoute: string = getNextRouteFromZoomLevel(DEPARTEMENT_ZOOM_LEVEL, REGION_ZOOM_LEVEL);

    expect(nextRoute).toStrictEqual('departements');
  });

  it('should get departements when current zoom level is departement and previous zoom level is lieux zoom level', (): void => {
    const previousZoomLevel: number = 14;

    const nextRoute: string = getNextRouteFromZoomLevel(DEPARTEMENT_ZOOM_LEVEL, previousZoomLevel);

    expect(nextRoute).toStrictEqual('departements');
  });

  it('should get empty string when current zoom level is departement and previous zoom level is departement too', (): void => {
    const previousZoomLevel: number = 9;
    const nextRoute: string = getNextRouteFromZoomLevel(DEPARTEMENT_ZOOM_LEVEL, previousZoomLevel);

    expect(nextRoute).toStrictEqual('');
  });

  it('should get lieux when current zoom level is lieux and previous zoom level is different from lieux', (): void => {
    const currentZoomLevel: number = 11;

    const nextRoute: string = getNextRouteFromZoomLevel(currentZoomLevel, DEPARTEMENT_ZOOM_LEVEL);

    expect(nextRoute).toStrictEqual('..');
  });

  it('should get empty string when current zoom level is lieux and previous zoom level lieux too', (): void => {
    const currentZoomLevel: number = 11;
    const previousZoomLevel: number = 14;

    const nextRoute: string = getNextRouteFromZoomLevel(currentZoomLevel, previousZoomLevel);

    expect(nextRoute).toStrictEqual('');
  });
});

import {
  REGION_ZOOM_LEVEL,
  DEPARTEMENT_ZOOM_LEVEL,
  getNextRouteFromZoomLevel,
  shouldNavigateToListPage
} from './zoom-level-navigation.presenter';

describe('zoom level navigation presenter', (): void => {
  it('should get regions when current zoom level is region and previous zoom level is different from region', (): void => {
    const nextRoute: string[] = getNextRouteFromZoomLevel(REGION_ZOOM_LEVEL);

    expect(nextRoute).toStrictEqual(['regions']);
  });

  it('should get departements when current zoom level is departement and previous zoom level is lieux zoom level', (): void => {
    const nextRoute: string[] = getNextRouteFromZoomLevel(DEPARTEMENT_ZOOM_LEVEL);

    expect(nextRoute).toStrictEqual(['regions']);
  });

  it('should get departements when current zoom level is departement and previous zoom level is lieux zoom level', (): void => {
    const nextRoute: string[] = getNextRouteFromZoomLevel(DEPARTEMENT_ZOOM_LEVEL, 'Île-de-France');

    expect(nextRoute).toStrictEqual(['regions', 'Île-de-France']);
  });

  it('should get lieux when current zoom level is lieux and previous zoom level is different from lieux', (): void => {
    const currentZoomLevel: number = 11;

    const nextRoute: string[] = getNextRouteFromZoomLevel(currentZoomLevel);

    expect(nextRoute).toStrictEqual(['.']);
  });

  it('should not navigate when route config is undefined', (): void => {
    const shouldNavigate: boolean = shouldNavigateToListPage(['regions']);

    expect(shouldNavigate).toStrictEqual(false);
  });

  it('should navigate to regions when route config is regions/:nomRegion', (): void => {
    const shouldNavigate: boolean = shouldNavigateToListPage(['regions'], 'regions/:nomRegion');

    expect(shouldNavigate).toStrictEqual(true);
  });

  it('should not navigate to regions when route config is regions', (): void => {
    const shouldNavigate: boolean = shouldNavigateToListPage(['regions'], 'regions');

    expect(shouldNavigate).toStrictEqual(false);
  });

  it('should navigate to regions/Île-de-France when route config is regions/:nomRegion/:nomDepartement', (): void => {
    const shouldNavigate: boolean = shouldNavigateToListPage(
      ['regions', 'Île-de-France'],
      'regions/:nomRegion/:nomDepartement'
    );

    expect(shouldNavigate).toStrictEqual(true);
  });

  it('should navigate to regions/Île-de-France when route config is regions', (): void => {
    const shouldNavigate: boolean = shouldNavigateToListPage(['regions', 'Île-de-France'], 'regions');

    expect(shouldNavigate).toStrictEqual(true);
  });

  it('should navigate to . when route config is regions', (): void => {
    const shouldNavigate: boolean = shouldNavigateToListPage(['.'], 'regions');

    expect(shouldNavigate).toStrictEqual(true);
  });

  it('should not navigate to . when route config is regions/:nomRegion/:nomDepartement', (): void => {
    const shouldNavigate: boolean = shouldNavigateToListPage(['.'], 'regions/:nomRegion/:nomDepartement');

    expect(shouldNavigate).toStrictEqual(false);
  });

  it('should not navigate to . when route config is :id', (): void => {
    const shouldNavigate: boolean = shouldNavigateToListPage(['.'], ':id');

    expect(shouldNavigate).toStrictEqual(false);
  });
});

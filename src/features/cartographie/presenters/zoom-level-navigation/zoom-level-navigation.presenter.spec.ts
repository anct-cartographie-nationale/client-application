import {
  REGION_ZOOM_LEVEL,
  DEPARTEMENT_ZOOM_LEVEL,
  getNextRouteFromZoomLevel,
  shouldNavigateToListPage
} from './zoom-level-navigation.presenter';

describe('zoom level navigation presenter', (): void => {
  it('should get regions when current zoom level is region and previous zoom level is different from region', (): void => {
    const nextRoute: string = getNextRouteFromZoomLevel(REGION_ZOOM_LEVEL);

    expect(nextRoute).toStrictEqual('regions');
  });

  it('should get departements when current zoom level is departement and previous zoom level is lieux zoom level', (): void => {
    const nextRoute: string = getNextRouteFromZoomLevel(DEPARTEMENT_ZOOM_LEVEL);

    expect(nextRoute).toStrictEqual('departements');
  });

  it('should get lieux when current zoom level is lieux and previous zoom level is different from lieux', (): void => {
    const currentZoomLevel: number = 11;

    const nextRoute: string = getNextRouteFromZoomLevel(currentZoomLevel);

    expect(nextRoute).toStrictEqual('.');
  });

  it('should not navigate when page name is undefined', (): void => {
    const shouldNavigate: boolean = shouldNavigateToListPage('regions');

    expect(shouldNavigate).toStrictEqual(false);
  });

  it('should navigate to regions when page name is DepartementsPage', (): void => {
    const shouldNavigate: boolean = shouldNavigateToListPage('regions', 'DepartementsPage');

    expect(shouldNavigate).toStrictEqual(true);
  });

  it('should not navigate to regions when page name is RegionsPage', (): void => {
    const shouldNavigate: boolean = shouldNavigateToListPage('regions', 'RegionsPage');

    expect(shouldNavigate).toStrictEqual(false);
  });

  it('should navigate to departements when page name is LieuxMediationNumeriqueListPage', (): void => {
    const shouldNavigate: boolean = shouldNavigateToListPage('departements', 'LieuxMediationNumeriqueListPage');

    expect(shouldNavigate).toStrictEqual(true);
  });

  it('should not navigate to departements when page name is DepartementsPage', (): void => {
    const shouldNavigate: boolean = shouldNavigateToListPage('departements', 'DepartementsPage');

    expect(shouldNavigate).toStrictEqual(false);
  });

  it('should navigate to . when page name is RegionsPage', (): void => {
    const shouldNavigate: boolean = shouldNavigateToListPage('.', 'RegionsPage');

    expect(shouldNavigate).toStrictEqual(true);
  });

  it('should not navigate to . when page name is LieuxMediationNumeriqueListPage', (): void => {
    const shouldNavigate: boolean = shouldNavigateToListPage('.', 'LieuxMediationNumeriqueListPage');

    expect(shouldNavigate).toStrictEqual(false);
  });
});

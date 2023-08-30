import { BreadcrumbItem } from './breadcrumb-item.presentation';
import { getBreadcrumbItems } from './breadcrumb-items.presenter';
import { UrlSegment } from '@angular/router';

describe('breadcrumb items', (): void => {
  it('should display France label with /regions path', (): void => {
    const breadcrumbItems: BreadcrumbItem[] = getBreadcrumbItems([new UrlSegment('regions', {})], 5);

    expect(breadcrumbItems).toStrictEqual<BreadcrumbItem[]>([
      {
        label: 'France'
      }
    ]);
  });

  it('should display France > Auvergne-Rhône-Alpes label with /regions/Auvergne-Rhône-Alpes path', (): void => {
    const breadcrumbItems: BreadcrumbItem[] = getBreadcrumbItems(
      [new UrlSegment('regions', {}), new UrlSegment('Auvergne-Rhône-Alpes', {})],
      5
    );

    expect(breadcrumbItems).toStrictEqual<BreadcrumbItem[]>([
      {
        label: 'France',
        link: ['regions']
      },
      {
        label: 'Auvergne-Rhône-Alpes'
      }
    ]);
  });

  it('should display France > Auvergne-Rhône-Alpes > Rhône label with /regions/Auvergne-Rhône-Alpes/Rhône path', (): void => {
    const breadcrumbItems: BreadcrumbItem[] = getBreadcrumbItems(
      [new UrlSegment('regions', {}), new UrlSegment('Auvergne-Rhône-Alpes', {}), new UrlSegment('Rhône', {})],
      5
    );

    expect(breadcrumbItems).toStrictEqual<BreadcrumbItem[]>([
      {
        label: 'France',
        link: ['regions']
      },
      {
        label: 'Auvergne-Rhône-Alpes',
        link: ['regions', 'Auvergne-Rhône-Alpes']
      },
      {
        label: 'Rhône'
      }
    ]);
  });

  it('should display France > Auvergne-Rhône-Alpes > Rhône label with /regions/Auvergne-Rhône-Alpes/Rhône/62c5360ac9ce0606dcdcfda0 path', (): void => {
    const breadcrumbItems: BreadcrumbItem[] = getBreadcrumbItems(
      [
        new UrlSegment('regions', {}),
        new UrlSegment('Auvergne-Rhône-Alpes', {}),
        new UrlSegment('Rhône', {}),
        new UrlSegment('62c5360ac9ce0606dcdcfda0', {})
      ],
      5
    );

    expect(breadcrumbItems).toStrictEqual<BreadcrumbItem[]>([
      {
        label: 'France',
        link: ['regions']
      },
      {
        label: 'Auvergne-Rhône-Alpes',
        link: ['regions', 'Auvergne-Rhône-Alpes']
      },
      {
        label: 'Rhône'
      }
    ]);
  });

  it('should display France label with /:id path', (): void => {
    const breadcrumbItems: BreadcrumbItem[] = getBreadcrumbItems([new UrlSegment('62d94351c65b1606dd4d3779', {})], 5);

    expect(breadcrumbItems).toStrictEqual<BreadcrumbItem[]>([
      {
        label: 'France'
      }
    ]);
  });

  it('should display France label with / path', (): void => {
    const breadcrumbItems: BreadcrumbItem[] = getBreadcrumbItems([], 5);

    expect(breadcrumbItems).toStrictEqual<BreadcrumbItem[]>([
      {
        label: 'France'
      }
    ]);
  });

  it('should display Lieux de médiation numérique affichés sur la carte label with /:id path when zoom level is local', (): void => {
    const breadcrumbItems: BreadcrumbItem[] = getBreadcrumbItems([new UrlSegment('62d94351c65b1606dd4d3779', {})], 9);

    expect(breadcrumbItems).toStrictEqual<BreadcrumbItem[]>([
      {
        label: 'Retour à la liste des régions',
        link: ['regions']
      }
    ]);
  });

  it('should display Lieux de médiation numérique affichés sur la carte label with / path when zoom level is local', (): void => {
    const breadcrumbItems: BreadcrumbItem[] = getBreadcrumbItems([], 9);

    expect(breadcrumbItems).toStrictEqual<BreadcrumbItem[]>([
      {
        label: 'Retour à la liste des régions',
        link: ['regions']
      }
    ]);
  });
});

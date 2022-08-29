import { BreadcrumbItem } from './breadcrumb-item.presentation';
import { getBreadcrumbItems } from './breadcrumb-items.presenter';
import { UrlSegment } from '@angular/router';

describe('breadcrumb items', (): void => {
  it('should display Lieux de médiation numérique par région label with /regions path', (): void => {
    const breadcrumbItems: BreadcrumbItem[] = getBreadcrumbItems([new UrlSegment('regions', {})]);

    expect(breadcrumbItems).toStrictEqual<BreadcrumbItem[]>([
      {
        label: 'Lieux de médiation numérique par région'
      }
    ]);
  });

  it('should display France > Auvergne-Rhône-Alpes label with /regions/Auvergne-Rhône-Alpes path', (): void => {
    const breadcrumbItems: BreadcrumbItem[] = getBreadcrumbItems([
      new UrlSegment('regions', {}),
      new UrlSegment('Auvergne-Rhône-Alpes', {})
    ]);

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
    const breadcrumbItems: BreadcrumbItem[] = getBreadcrumbItems([
      new UrlSegment('regions', {}),
      new UrlSegment('Auvergne-Rhône-Alpes', {}),
      new UrlSegment('Rhône', {})
    ]);

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

  it('should display Lieux de médiation numérique affichés sur la carte label with /:id path', (): void => {
    const breadcrumbItems: BreadcrumbItem[] = getBreadcrumbItems([new UrlSegment('62d94351c65b1606dd4d3779', {})]);

    expect(breadcrumbItems).toStrictEqual<BreadcrumbItem[]>([
      {
        label: 'Lieux de médiation numérique affichés sur la carte'
      }
    ]);
  });

  it('should display Lieux de médiation numérique affichés sur la carte label with / path', (): void => {
    const breadcrumbItems: BreadcrumbItem[] = getBreadcrumbItems([]);

    expect(breadcrumbItems).toStrictEqual<BreadcrumbItem[]>([
      {
        label: 'Lieux de médiation numérique affichés sur la carte'
      }
    ]);
  });
});

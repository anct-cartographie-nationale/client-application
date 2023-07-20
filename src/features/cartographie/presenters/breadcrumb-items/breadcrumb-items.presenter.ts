import { UrlSegment } from '@angular/router';
import { BreadcrumbItem } from './breadcrumb-item.presentation';

const breadcrumbItemsForUnhandledPathsRegional: BreadcrumbItem[] = [
  {
    label: 'France'
  }
];

const breadcrumbItemsForUnhandledPathsLocal: BreadcrumbItem[] = [
  {
    label: 'Lieux de médiation numérique affichés sur la carte'
  }
];

const breadcrumbItemsForRegions: BreadcrumbItem[] = [
  {
    label: 'France',
    link: ['regions']
  }
];

const isUnhandledUrlSegments = (urlSegments?: UrlSegment[]): boolean =>
  urlSegments?.length === 0 || urlSegments?.[0]?.path !== 'regions';

const isRootPath = (urlSegments: UrlSegment[]): boolean => urlSegments.length === 1;

const isLastSegmentOfPath = (index: number, urlSegments: UrlSegment[]) => index === urlSegments.length - 1;

const previousLink = (urlSegments: UrlSegment[]) =>
  urlSegments.reduce(
    (link: string[], urlSegment: UrlSegment, index: number): string[] => [
      ...link,
      ...(isLastSegmentOfPath(index, urlSegments) ? [] : [urlSegment.path])
    ],
    []
  );

const getBreadcrumbItemForIndex = (urlSegments: UrlSegment[], index: number): BreadcrumbItem => ({
  label: urlSegments[index].path,
  ...(!isLastSegmentOfPath(index, urlSegments) && {
    link: previousLink(urlSegments)
  })
});

const getBreadcrumbItemsFromUrlSegments = (urlSegments: UrlSegment[]) =>
  isRootPath(urlSegments)
    ? breadcrumbItemsForUnhandledPathsRegional
    : [
        ...urlSegments.reduce(
          (breadcrumbItems: BreadcrumbItem[], urlSegment: UrlSegment, index: number) =>
            urlSegment.path === 'regions'
              ? breadcrumbItemsForRegions
              : [...breadcrumbItems, getBreadcrumbItemForIndex(urlSegments, index)],
          []
        )
      ];

const breadcrumbItemsForUnhandledPaths = (zoomLevel: number): BreadcrumbItem[] =>
  zoomLevel < 9 ? breadcrumbItemsForUnhandledPathsRegional : breadcrumbItemsForUnhandledPathsLocal;

export const getBreadcrumbItems = (urlSegments: UrlSegment[], zoomLevel: number): BreadcrumbItem[] =>
  isUnhandledUrlSegments(urlSegments)
    ? breadcrumbItemsForUnhandledPaths(zoomLevel)
    : getBreadcrumbItemsFromUrlSegments(urlSegments.slice(0, 3));

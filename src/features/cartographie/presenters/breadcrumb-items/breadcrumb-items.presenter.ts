import { UrlSegment } from '@angular/router';
import { BreadcrumbItem } from './breadcrumb-item.presentation';

const breadcrumbItemsForUnhandledPaths: BreadcrumbItem[] = [
  {
    label: 'Lieux de médiation numérique affichés sur la carte'
  }
];

const breadcrumbItemsForRoot: BreadcrumbItem[] = [
  {
    label: 'Lieux de médiation numérique par région'
  }
];

const breadcrumbItemsForRegions: BreadcrumbItem[] = [
  {
    label: 'France',
    link: ['regions']
  }
];

const isUnhandledUrlSegments = (urlSegments: UrlSegment[]): boolean =>
  urlSegments.length === 0 || urlSegments[0].path !== 'regions';

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
    ? breadcrumbItemsForRoot
    : [
        ...urlSegments.reduce(
          (breadcrumbItems: BreadcrumbItem[], urlSegment: UrlSegment, index: number) =>
            urlSegment.path === 'regions'
              ? breadcrumbItemsForRegions
              : [...breadcrumbItems, getBreadcrumbItemForIndex(urlSegments, index)],
          []
        )
      ];

export const getBreadcrumbItems = (urlSegments: UrlSegment[]): BreadcrumbItem[] =>
  isUnhandledUrlSegments(urlSegments)
    ? breadcrumbItemsForUnhandledPaths
    : getBreadcrumbItemsFromUrlSegments(urlSegments.slice(0, 3));

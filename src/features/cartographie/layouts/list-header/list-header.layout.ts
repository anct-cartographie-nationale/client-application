import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { RouterOutlet, UrlSegment } from '@angular/router';
import { getBreadcrumbItems, BreadcrumbItem } from '../../presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'list-header.layout.html'
})
export class ListHeaderLayout {
  @ViewChild(RouterOutlet) public routerOutlet!: RouterOutlet;

  public getBreadcrumbItems = (urlSegments: UrlSegment[]): BreadcrumbItem[] => getBreadcrumbItems(urlSegments);
}

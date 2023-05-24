import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { RouterOutlet, UrlSegment } from '@angular/router';
import { regionFromNom, RegionPresentation, MarkersPresenter } from '../../../core/presenters';
import { getBreadcrumbItems, BreadcrumbItem } from '../../presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'list-header.layout.html'
})
export class ListHeaderLayout {
  @ViewChild(RouterOutlet) public routerOutlet!: RouterOutlet;

  public getBreadcrumbItems = (urlSegments: UrlSegment[], zoomLevel: number): BreadcrumbItem[] =>
    getBreadcrumbItems(urlSegments, zoomLevel);

  public constructor(public readonly markersPresenter: MarkersPresenter) {}

  public showLieux(label: string): void {
    const regionMatchingLabel: RegionPresentation | undefined = regionFromNom(label);
    regionMatchingLabel ? this.setToRegionView(regionMatchingLabel) : this.resetToDefaultView();
  }

  private setToRegionView(regionMatchingLabel: RegionPresentation): void {
    this.markersPresenter.center(regionMatchingLabel.localisation, regionMatchingLabel.zoom);
  }

  private resetToDefaultView(): void {
    this.markersPresenter.reset();
  }
}

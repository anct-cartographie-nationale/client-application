import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { RouterOutlet, UrlSegment } from '@angular/router';
import { getBreadcrumbItems, BreadcrumbItem } from '../../presenters';
import { regionFromNom, RegionPresentation, MarkersPresenter } from '../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'list-header.layout.html'
})
export class ListHeaderLayout {
  @ViewChild(RouterOutlet) public routerOutlet!: RouterOutlet;

  public getBreadcrumbItems = (urlSegments: UrlSegment[]): BreadcrumbItem[] => getBreadcrumbItems(urlSegments);

  public constructor(private _markersPresenter: MarkersPresenter) {}

  public showLieux(label: string): void {
    const regionMatchingLabel: RegionPresentation | undefined = regionFromNom(label);
    regionMatchingLabel ? this.setToRegionView(regionMatchingLabel) : this.resetToDefaultView();
  }

  private setToRegionView(regionMatchingLabel: RegionPresentation): void {
    this._markersPresenter.center(regionMatchingLabel.localisation, regionMatchingLabel.zoom);
  }

  private resetToDefaultView(): void {
    this._markersPresenter.reset();
  }
}

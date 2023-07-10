import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UrlSegment } from '@angular/router';
import { regionFromNom, RegionPresentation } from '../../../core/presenters';
import { BreadcrumbItem, getBreadcrumbItems } from '../../presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-location-breadcrumb',
  templateUrl: './location-breadcrumb.component.html'
})
export class LocationBreadcrumbComponent {
  @Input() public url: UrlSegment[] = [];

  @Input() public zoom: number = 0;

  @Output() public showLieux: EventEmitter<RegionPresentation | undefined> = new EventEmitter<RegionPresentation | undefined>();

  public getBreadcrumbItems = (urlSegments: UrlSegment[], zoomLevel: number): BreadcrumbItem[] =>
    getBreadcrumbItems(urlSegments, zoomLevel);

  public onClick(nom: string): void {
    this.showLieux.emit(regionFromNom(nom));
  }
}

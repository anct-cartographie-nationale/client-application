import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Localisation, RegionPresentation } from '../../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-region-markers',
  templateUrl: './region-markers.component.html'
})
export class RegionMarkersComponent {
  @Input() public currentZoomLevel!: number;

  @Input() public regions: RegionPresentation[] = [];

  @Output() showLieux: EventEmitter<Localisation> = new EventEmitter<Localisation>();

  public trackByRegionCode(_: number, region: RegionPresentation) {
    return region.code;
  }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RegionPresentation } from '../../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-region-markers',
  templateUrl: './region-markers.component.html'
})
export class RegionMarkersComponent {
  @Input() public regions: RegionPresentation[] = [];

  @Output() showLieux: EventEmitter<RegionPresentation> = new EventEmitter<RegionPresentation>();

  public trackByRegionCode(_: number, region: RegionPresentation) {
    return region.code;
  }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RegionPresentation } from '../../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-region-markers',
  templateUrl: './region-markers.component.html'
})
export class RegionMarkersComponent {
  @Input() public regions: RegionPresentation[] = [];
  @Input() public hoverId: string = '';

  @Output() showLieux: EventEmitter<RegionPresentation> = new EventEmitter<RegionPresentation>();
  @Output() public enableHover: EventEmitter<string> = new EventEmitter<string>();
  @Output() public disableHover: EventEmitter<void> = new EventEmitter<void>();

  public trackByRegionCode(_: number, region: RegionPresentation) {
    return region.code;
  }

  public highlightState(regionId: string) {
    if (regionId === this.hoverId) return 'hover';
    return undefined;
  }
}

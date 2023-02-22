import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedFeatureConfiguration } from '../../../../root';
import { HttpParams } from '@angular/common/http';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-display-on-map-link',
  templateUrl: './display-on-map-link.component.html'
})
export class DisplayOnMapLinkComponent {
  @Input() public cartographieFeature?: ActivatedFeatureConfiguration<boolean>;

  @Input() public lieuxMediationNumeriqueCount: number = 0;

  @Input() public queryParams: {} = {};

  @Input() public btnType: 'primary' | 'secondary' = 'primary';

  @Output() public resetFilters: EventEmitter<void> = new EventEmitter<void>();

  public toQueryString(fromObject: {} = {}): string {
    return new HttpParams({ fromObject }).toString();
  }
}

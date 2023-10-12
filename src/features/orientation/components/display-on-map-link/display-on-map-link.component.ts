import { ChangeDetectionStrategy, Component, Input, Optional } from '@angular/core';
import { ActivatedFeatureConfiguration } from '../../../../root';
import { HttpParams } from '@angular/common/http';
import { MatomoTracker } from 'ngx-matomo';
import { ActivatedRoute } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-display-on-map-link',
  templateUrl: './display-on-map-link.component.html'
})
export class DisplayOnMapLinkComponent {
  @Input() public cartographieFeature?: ActivatedFeatureConfiguration<boolean>;

  @Input() public lieuxMediationNumeriqueCount: number = 0;

  @Input() public queryParams: {} = {};

  @Input() public buttonStyle: 'primary' | 'secondary' = 'secondary';

  public constructor(private route: ActivatedRoute, @Optional() private readonly _matomoTracker?: MatomoTracker) {}

  public toQueryString(fromObject: {} = {}): string {
    return new HttpParams({ fromObject }).toString();
  }

  public matomoTracking(): void {
    const filtersKeys = this.route.snapshot.queryParams;
    Object.keys(filtersKeys).map((key) =>
      this._matomoTracker?.trackEvent(
        'Parcours orientation',
        'filtres',
        `${key} - ${Array.isArray(filtersKeys[key]) ? filtersKeys[key].join(', ') : filtersKeys[key]}`
      )
    );
  }
}

import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { BrandConfiguration, BRAND_TOKEN, ASSETS_TOKEN, AssetsConfiguration } from '../../../../root';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-filter-result-count',
  templateUrl: './filter-result-count.component.html'
})
export class FilterResultCountComponent {
  @Input() public total: number = 0;

  @Input() public found: number = 0;
}

import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { BrandConfiguration, BRAND_TOKEN } from '../../../../root';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-filter-result-count',
  templateUrl: './filter-result-count.component.html'
})
export class FilterResultCountComponent {
  @Input() public total: number = 0;

  @Input() public found: number = 0;

  @Input() public empty: boolean = false;

  @Input() public size: 'sm' | 'auto' = 'auto';

  public constructor(@Inject(BRAND_TOKEN) public readonly brandConfiguration: BrandConfiguration) {}
}

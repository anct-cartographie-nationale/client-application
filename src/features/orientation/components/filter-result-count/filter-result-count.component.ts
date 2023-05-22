import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-filter-result-count',
  templateUrl: './filter-result-count.component.html'
})
export class FilterResultCountComponent {
  @Input() public total: number = 0;

  @Input() public found: number = 0;
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedFeatureConfiguration } from '../../../../root';
import { FilterFormPresentation, hasActiveFilter } from '../../../core/presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-no-lieux-found',
  templateUrl: './no-lieux-found.component.html'
})
export class NoLieuxFoundComponent {
  @Input() public queryParams: string = '';
  @Input() public filterPresentation: FilterFormPresentation | null = null;
  @Input() public orientationFeature?: ActivatedFeatureConfiguration<boolean>;
  @Output() public resetFilters: EventEmitter<void> = new EventEmitter<void>();

  public hasActiveFilter = hasActiveFilter;
}

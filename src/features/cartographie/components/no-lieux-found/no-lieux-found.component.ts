import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedFeatureConfiguration } from '../../../../root';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-no-lieux-found',
  templateUrl: './no-lieux-found.component.html'
})
export class NoLieuxFoundComponent {
  @Input() public queryParams: string = '';
  @Input() public orientationFeature?: ActivatedFeatureConfiguration<boolean>;
  @Input() public hasFilters: boolean = true;
  @Output() public resetFilters: EventEmitter<void> = new EventEmitter<void>();
}

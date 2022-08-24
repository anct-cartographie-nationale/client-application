import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DepartementPresentation } from '../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-regions-list',
  templateUrl: './regions-list.component.html'
})
export class RegionsListComponent {
  @Input() regions: DepartementPresentation[] = [];

  @Output() showLieux: EventEmitter<DepartementPresentation> = new EventEmitter<DepartementPresentation>();
}

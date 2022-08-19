import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Bounds, DepartementPresentation } from '../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-departements-list',
  templateUrl: './departements-list.component.html'
})
export class DepartementsListComponent {
  @Input() departements: DepartementPresentation[] = [];

  @Output() showLieux: EventEmitter<Bounds> = new EventEmitter<Bounds>();
}

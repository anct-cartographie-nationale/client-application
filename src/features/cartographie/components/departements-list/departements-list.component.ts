import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DepartementPresentation } from '../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-departements-list',
  templateUrl: './departements-list.component.html'
})
export class DepartementsListComponent {
  @Input() departements: DepartementPresentation[] = [];
  @Input() public hoverId: string | null = null;

  @Output() showLieux: EventEmitter<DepartementPresentation> = new EventEmitter<DepartementPresentation>();
  @Output() public enableHover: EventEmitter<string> = new EventEmitter<string>();
  @Output() public disableHover: EventEmitter<void> = new EventEmitter<void>();
}

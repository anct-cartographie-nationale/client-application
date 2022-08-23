import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DepartementPresentation, Localisation } from '../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-regions-list',
  templateUrl: './regions-list.component.html'
})
export class RegionsListComponent {
  @Input() regions: DepartementPresentation[] = [];

  @Output() showLieux: EventEmitter<Localisation> = new EventEmitter<Localisation>();
}

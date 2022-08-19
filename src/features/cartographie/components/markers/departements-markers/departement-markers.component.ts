import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Bounds, DepartementPresentation } from '../../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-departement-markers',
  templateUrl: './departement-markers.component.html'
})
export class DepartementMarkersComponent {
  @Input() public currentZoomLevel!: number;

  @Input() public departements: DepartementPresentation[] = [];

  @Output() showLieux: EventEmitter<Bounds> = new EventEmitter<Bounds>();

  public trackByDepartementCode(_: number, departement: DepartementPresentation) {
    return departement.code;
  }
}

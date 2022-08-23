import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DepartementPresentation, Localisation } from '../../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-departement-markers',
  templateUrl: './departement-markers.component.html'
})
export class DepartementMarkersComponent {
  @Input() public currentZoomLevel!: number;

  @Input() public departements: DepartementPresentation[] = [];

  @Output() showLieux: EventEmitter<Localisation> = new EventEmitter<Localisation>();

  public trackByDepartementCode(_: number, departement: DepartementPresentation) {
    return departement.code;
  }
}

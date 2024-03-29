import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CoordinateurOnMapPresentation } from '../../presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-coordinateurs-markers',
  templateUrl: './coordinateurs-markers.component.html'
})
export class CoordinateursMarkersComponent {
  @Input() public coordinateurs: CoordinateurOnMapPresentation[] = [];

  @Input() public selectedId: string = '';

  @Input() public hoverId: string = '';

  @Output() public showDetails: EventEmitter<string> = new EventEmitter<string>();

  @Output() public highlight: EventEmitter<CoordinateurOnMapPresentation | undefined> = new EventEmitter<
    CoordinateurOnMapPresentation | undefined
  >();

  public trackByCoordinateurId = (_: number, coordinateur: CoordinateurOnMapPresentation) => coordinateur.id;
}

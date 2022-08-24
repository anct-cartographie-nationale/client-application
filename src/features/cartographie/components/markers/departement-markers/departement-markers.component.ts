import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DepartementPresentation } from '../../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-departement-markers',
  templateUrl: './departement-markers.component.html'
})
export class DepartementMarkersComponent {
  @Input() public departements: DepartementPresentation[] = [];

  @Output() showLieux: EventEmitter<DepartementPresentation> = new EventEmitter<DepartementPresentation>();

  public trackByDepartementCode(_: number, departement: DepartementPresentation) {
    return departement.code;
  }
}

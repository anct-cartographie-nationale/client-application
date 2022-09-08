import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DepartementPresentation } from '../../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-departement-markers',
  templateUrl: './departement-markers.component.html'
})
export class DepartementMarkersComponent {
  @Input() public departements: DepartementPresentation[] = [];
  @Input() public hoverId: string = '';

  @Output() showLieux: EventEmitter<DepartementPresentation> = new EventEmitter<DepartementPresentation>();
  @Output() public enableHover: EventEmitter<string> = new EventEmitter<string>();
  @Output() public disableHover: EventEmitter<void> = new EventEmitter<void>();

  public trackByDepartementCode(_: number, departement: DepartementPresentation) {
    return departement.code;
  }

  public highlightState(departementId: string) {
    if (departementId === this.hoverId) return 'hover';
    return undefined;
  }
}

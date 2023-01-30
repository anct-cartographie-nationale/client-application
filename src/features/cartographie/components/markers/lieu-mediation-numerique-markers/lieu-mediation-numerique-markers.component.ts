import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LieuMediationNumeriqueOnMapPresentation } from '../../../presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lieu-mediation-numerique-markers',
  templateUrl: './lieu-mediation-numerique-markers.component.html'
})
export class LieuMediationNumeriqueMarkersComponent {
  @Input() public lieuxMediationNumeriques: LieuMediationNumeriqueOnMapPresentation[] = [];

  @Input() public selectedId: string = '';
  @Input() public hoverId: string = '';

  @Output() public showDetails: EventEmitter<LieuMediationNumeriqueOnMapPresentation> =
    new EventEmitter<LieuMediationNumeriqueOnMapPresentation>();

  @Output() public enableHover: EventEmitter<string> = new EventEmitter<string>();
  @Output() public disableHover: EventEmitter<void> = new EventEmitter<void>();

  public trackByLieuId(_: number, lieu: LieuMediationNumeriqueOnMapPresentation) {
    return lieu.id;
  }

  public highlightState(lieuMediationNumeriqueId: string) {
    if (lieuMediationNumeriqueId === this.selectedId) return 'focus';
    if (lieuMediationNumeriqueId === this.hoverId) return 'hover';
    return undefined;
  }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LieuMediationNumeriquePresentation } from '../../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lieu-mediation-numerique-markers',
  templateUrl: './lieu-mediation-numerique-markers.component.html'
})
export class LieuMediationNumeriqueMarkersComponent {
  @Input() public lieuxMediationNumeriques: LieuMediationNumeriquePresentation[] = [];

  @Input() public selectedId: string = '';
  @Input() public hoverId: string = '';

  @Output() public showDetails: EventEmitter<LieuMediationNumeriquePresentation> =
    new EventEmitter<LieuMediationNumeriquePresentation>();

  @Output() public enableHover: EventEmitter<string> = new EventEmitter<string>();
  @Output() public disableHover: EventEmitter<void> = new EventEmitter<void>();

  public trackByLieuId(_: number, lieu: LieuMediationNumeriquePresentation) {
    return lieu.id;
  }

  public highlightState(lieuMediationNumeriqueId: string) {
    if (lieuMediationNumeriqueId === this.selectedId) return 'focus';
    if (lieuMediationNumeriqueId === this.hoverId) return 'hover';
    return undefined;
  }
}

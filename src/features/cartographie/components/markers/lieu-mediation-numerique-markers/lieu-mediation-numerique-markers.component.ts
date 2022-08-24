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

  @Output() public showDetails: EventEmitter<LieuMediationNumeriquePresentation> =
    new EventEmitter<LieuMediationNumeriquePresentation>();

  public trackByLieuId(_: number, lieu: LieuMediationNumeriquePresentation) {
    return lieu.id;
  }
}

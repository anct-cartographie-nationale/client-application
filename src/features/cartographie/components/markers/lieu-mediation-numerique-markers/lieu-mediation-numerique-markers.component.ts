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
  @Input() public displayTooltip: boolean = true;

  @Output() public showDetails: EventEmitter<LieuMediationNumeriqueOnMapPresentation> =
    new EventEmitter<LieuMediationNumeriqueOnMapPresentation>();

  @Output() public highlight: EventEmitter<LieuMediationNumeriqueOnMapPresentation | undefined> = new EventEmitter<
    LieuMediationNumeriqueOnMapPresentation | undefined
  >();

  public trackByLieuId(_: number, lieu: LieuMediationNumeriqueOnMapPresentation) {
    return lieu.id;
  }
}

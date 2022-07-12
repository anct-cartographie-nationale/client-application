import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LieuMediationNumeriqueListItemPresentation } from '@features/cartographie/domain/presenters/lieux-mediation-numerique-list/lieu-mediation-numerique-list-item.presentation';
import { LieuMediationNumerique } from '../../../../../../models/lieu-mediation-numerique/lieu-mediation-numerique';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-mediation-numerique-list-item',
  templateUrl: './lieu-mediation-numerique-list-item.component.html'
})
export class LieuMediationNumeriqueListItemComponent {
  @Input() public lieuMediationNumerique!: LieuMediationNumeriqueListItemPresentation;
  @Output() public showDetails: EventEmitter<LieuMediationNumerique> = new EventEmitter<LieuMediationNumerique>();
  @Output() public hover: EventEmitter<LieuMediationNumerique> = new EventEmitter<LieuMediationNumerique>();
}

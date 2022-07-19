import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LieuMediationNumeriqueListItemPresentation } from '@features/cartographie/domain/presenters/lieux-mediation-numerique-list/lieu-mediation-numerique-list-item.presentation';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-mediation-numerique-list-item',
  templateUrl: './lieu-mediation-numerique-list-item.component.html'
})
export class LieuMediationNumeriqueListItemComponent {
  @Input() public lieuMediationNumerique!: LieuMediationNumeriqueListItemPresentation;
}

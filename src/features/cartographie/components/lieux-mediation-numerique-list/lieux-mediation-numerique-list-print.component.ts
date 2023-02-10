import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LieuMediationNumeriqueListItemPresentation } from '../../presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lieux-mediation-numerique-list-print',
  templateUrl: './lieux-mediation-numerique-list-print.component.html'
})
export class LieuxMediationNumeriqueListPrintComponent {
  @Input() public lieuxMediationNumerique: LieuMediationNumeriqueListItemPresentation[] = [];
}

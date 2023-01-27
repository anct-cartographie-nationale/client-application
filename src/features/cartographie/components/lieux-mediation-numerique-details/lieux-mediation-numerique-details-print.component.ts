import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LieuMediationNumeriqueDetailsPresentation } from '../../presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lieux-mediation-numerique-details-print',
  templateUrl: './lieux-mediation-numerique-details-print.component.html'
})
export class LieuxMediationNumeriqueDetailsPrintComponent {
  @Input() public lieuMediationNumerique!: LieuMediationNumeriqueDetailsPresentation;
}

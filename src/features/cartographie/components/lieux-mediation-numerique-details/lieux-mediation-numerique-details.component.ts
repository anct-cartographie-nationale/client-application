import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LieuMediationNumeriqueDetailsPresentation } from '../../presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lieux-mediation-numerique-details',
  templateUrl: './lieux-mediation-numerique-details.component.html'
})
export class LieuxMediationNumeriqueDetailsComponent {
  @Input() public lieuMediationNumerique!: LieuMediationNumeriqueDetailsPresentation;
}

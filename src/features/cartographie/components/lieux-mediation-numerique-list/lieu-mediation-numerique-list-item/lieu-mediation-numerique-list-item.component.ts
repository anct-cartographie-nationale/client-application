import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ConditionAcces } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { LieuMediationNumeriqueListItemPresentation } from '../../../presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-mediation-numerique-list-item',
  templateUrl: './lieu-mediation-numerique-list-item.component.html'
})
export class LieuMediationNumeriqueListItemComponent {
  @Input() public lieuMediationNumerique!: LieuMediationNumeriqueListItemPresentation;

  public readonly payant: ConditionAcces.Payant = ConditionAcces.Payant;
}

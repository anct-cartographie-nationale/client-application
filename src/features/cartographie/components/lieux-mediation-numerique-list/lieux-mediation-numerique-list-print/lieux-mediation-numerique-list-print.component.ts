import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { BRAND_TOKEN, BrandConfiguration } from '../../../../../root';
import { FilterPresentation } from '../../../../core';
import { LieuMediationNumeriqueListItemPresentation } from '../../../presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lieux-mediation-numerique-list-print',
  templateUrl: './lieux-mediation-numerique-list-print.component.html'
})
export class LieuxMediationNumeriqueListPrintComponent {
  @Input() public lieuxMediationNumerique: LieuMediationNumeriqueListItemPresentation[] = [];
  @Input() public filters?: FilterPresentation;

  public constructor(@Inject(BRAND_TOKEN) public readonly brandConfiguration: BrandConfiguration) {}
}

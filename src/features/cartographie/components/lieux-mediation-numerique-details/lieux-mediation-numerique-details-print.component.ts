import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { BRAND_TOKEN, BrandConfiguration } from '../../../../root';
import { FilterPresentation } from '../../../core';
import { LieuMediationNumeriqueDetailsPresentation } from '../../presenters';
import { OrientationSheetForm } from '../../forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lieux-mediation-numerique-details-print',
  templateUrl: './lieux-mediation-numerique-details-print.component.html'
})
export class LieuxMediationNumeriqueDetailsPrintComponent {
  @Input() public lieuMediationNumerique!: LieuMediationNumeriqueDetailsPresentation;
  @Input() public orientationSheetForm?: OrientationSheetForm;
  @Input() public filters?: FilterPresentation;

  public constructor(@Inject(BRAND_TOKEN) public readonly brandConfiguration: BrandConfiguration) {}
}

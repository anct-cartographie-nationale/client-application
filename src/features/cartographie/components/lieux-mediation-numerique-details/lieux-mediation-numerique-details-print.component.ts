import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { ASSETS_TOKEN, AssetsConfiguration, BRAND_TOKEN, BrandConfiguration } from '../../../../root';
import { FilterPresentation } from '../../../core/presenters';
import { LieuMediationNumeriqueDetailsPresentation } from '../../presenters';
import { OrientationSheetForm } from '../../models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lieux-mediation-numerique-details-print',
  templateUrl: './lieux-mediation-numerique-details-print.component.html'
})
export class LieuxMediationNumeriqueDetailsPrintComponent {
  @Input() public lieuMediationNumerique!: LieuMediationNumeriqueDetailsPresentation;
  @Input() public orientationSheetForm?: OrientationSheetForm;
  @Input() public filters?: FilterPresentation;

  public currentUrl: string = '';
  public currentDate = new Date();

  public constructor(
    @Inject(ASSETS_TOKEN) public readonly assetsConfiguration: AssetsConfiguration,
    @Inject(BRAND_TOKEN) public readonly brandConfiguration: BrandConfiguration
  ) {
    this.currentUrl = document.location.origin.replace(/^https?:\/\//, '');
  }
}

import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { BRAND_TOKEN, BrandConfiguration } from '../../../../../../root';
import { OrientationLayout } from '../../layouts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'demarrer.page.html'
})
export class DemarrerPage {
  public constructor(
    @Inject(BRAND_TOKEN) public readonly brandConfiguration: BrandConfiguration,
    public readonly orientationLayout: OrientationLayout
  ) {}
}

import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { BRAND_TOKEN, BrandConfiguration } from '../../../../../../root';
import { OrientationLayout } from '../../layouts';
import { ActivatedRoute } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'demarrer.page.html'
})
export class DemarrerPage {
  public constructor(
    @Inject(BRAND_TOKEN) public readonly brandConfiguration: BrandConfiguration,
    public readonly route: ActivatedRoute,
    public readonly orientationLayout: OrientationLayout
  ) {}
}

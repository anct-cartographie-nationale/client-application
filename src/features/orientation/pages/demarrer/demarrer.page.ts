import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BRAND_TOKEN, BrandConfiguration } from '../../../../root';
import { toFilterFormPresentationFromQuery } from '../../../core/presenters';
import { OrientationLayout } from '../../layouts';
import { hasActiveFilter } from './demarrer.page.presenter';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'demarrer.page.html'
})
export class DemarrerPage {
  public hasActiveFilter: boolean = hasActiveFilter(toFilterFormPresentationFromQuery(this._route.snapshot.queryParams));

  public constructor(
    @Inject(BRAND_TOKEN) public readonly brandConfiguration: BrandConfiguration,
    private readonly _route: ActivatedRoute,
    public readonly orientationLayout: OrientationLayout
  ) {}
}

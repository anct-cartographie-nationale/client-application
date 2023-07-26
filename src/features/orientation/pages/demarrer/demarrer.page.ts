import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BRAND_TOKEN, BrandConfiguration, SET_TITLE_ACTION, SetTitleAction } from '../../../../root';
import { hasActiveFilter, toFilterFormPresentationFromQuery } from '../../../core/presenters';
import { OrientationLayout } from '../../layouts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'demarrer.page.html'
})
export class DemarrerPage {
  public hasActiveFilter: boolean = hasActiveFilter(toFilterFormPresentationFromQuery(this._route.snapshot.queryParams));

  public constructor(
    @Inject(BRAND_TOKEN) public readonly brandConfiguration: BrandConfiguration,
    @Inject(SET_TITLE_ACTION) readonly setTitle: SetTitleAction,
    private readonly _route: ActivatedRoute,
    public readonly orientationLayout: OrientationLayout
  ) {
    setTitle(['Accueil', 'Orientation']);
  }
}

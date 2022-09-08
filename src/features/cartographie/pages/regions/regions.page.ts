import { ChangeDetectionStrategy, Component } from '@angular/core';
import { byCollectiviteTerritorialeNom, RegionPresentation, LieuxMediationNumeriquePresenter } from '../../../core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MarkersPresenter } from '../../presenters';
import { CartographieLayout } from '../../layouts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './regions.page.html'
})
export class RegionsPage {
  public regions$: Observable<RegionPresentation[]> = this._cartographieLayout.regions$.pipe(
    map((regions: RegionPresentation[]): RegionPresentation[] => [...regions].sort(byCollectiviteTerritorialeNom))
  );

  public hover(highlightedId?: string) {
    this.markersPresenter.hover(highlightedId ?? '');
  }

  public constructor(
    private readonly _cartographieLayout: CartographieLayout,
    private readonly _route: ActivatedRoute,
    private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter,
    public readonly markersPresenter: MarkersPresenter
  ) {}
}

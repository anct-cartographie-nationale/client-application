import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { byCollectiviteTerritorialeNom, RegionPresentation } from '../../../core';
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
    this.markersPresenter.highlight(highlightedId ?? '');
  }

  public constructor(
    private readonly _cartographieLayout: CartographieLayout,
    public readonly markersPresenter: MarkersPresenter
  ) {}
}

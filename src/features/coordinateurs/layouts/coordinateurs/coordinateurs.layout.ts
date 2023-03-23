import { ChangeDetectionStrategy, Component } from '@angular/core';
import { coordinateursLayoutProviders } from './coordinateurs.layout.providers';
import { MarkersPresenter } from '../../../cartographie/presenters';
import { Observable } from 'rxjs';
import { CoordinateurOnMapPresentation } from './coordinateur-on-map.presentation';
import { CoordinateursOnMapPresenter } from './coordinateurs-on-map.presenter';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './coordinateurs.layout.html',
  providers: coordinateursLayoutProviders
})
export class CoordinateursLayout {
  public coordinateurs$: Observable<CoordinateurOnMapPresentation[]> = this._coordinateursOnMapPresenter.coordinateurs$();

  public constructor(
    public readonly markersPresenter: MarkersPresenter,
    private readonly _coordinateursOnMapPresenter: CoordinateursOnMapPresenter
  ) {}

  public onHighlight = (highlightedId?: string): void => this.markersPresenter.highlight(highlightedId ?? '');
}

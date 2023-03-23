import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MarkersPresenter } from '../../../cartographie/presenters';
import { coordinateursLayoutProviders } from './coordinateurs.layout.providers';
import { CoordinateurOnMapPresentation } from './coordinateur-on-map.presentation';
import { CoordinateursOnMapPresenter } from './coordinateurs-on-map.presenter';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './coordinateurs.layout.html',
  providers: coordinateursLayoutProviders
})
export class CoordinateursLayout {
  public coordinateurs$: Observable<CoordinateurOnMapPresentation[]> = this._coordinateursOnMapPresenter.coordinateurs$();

  public constructor(
    public readonly markersPresenter: MarkersPresenter,
    public readonly router: Router,
    public readonly route: ActivatedRoute,
    private readonly _coordinateursOnMapPresenter: CoordinateursOnMapPresenter
  ) {}

  public onHighlight = (highlightedId?: string): void => this.markersPresenter.highlight(highlightedId ?? '');

  public onShowDetails(coordinateur: CoordinateurOnMapPresentation): void {
    this.router.navigate([coordinateur.id, 'details'], { relativeTo: this.route.parent });
  }
}

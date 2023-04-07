import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { ASSETS_TOKEN, AssetsConfiguration } from '../../../../root';
import { MarkersPresenter } from '../../../core';
import { ConseillerOnMapPresentation, CoordinateurOnMapPresentation } from '../../presenters';
import { CoordinateursOnMapPresenter } from './coordinateurs-on-map';
import { ConseillersOnMapPresenter } from './conseillers-on-map';
import { coordinateursLayoutProviders } from './coordinateurs.layout.providers';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './coordinateurs.layout.html',
  providers: coordinateursLayoutProviders
})
export class CoordinateursLayout {
  public coordinateurs$: Observable<CoordinateurOnMapPresentation[]> = this._coordinateursOnMapPresenter.coordinateurs$();

  public conseillers$: Observable<ConseillerOnMapPresentation[]> = this._conseillersOnMapPresenter.conseillers$();

  public nombreConseillersNonCoordonnes$: Observable<number> = this._conseillersOnMapPresenter.nombreConseillersNonCoordonnes$;

  public nombreConseillersCoordonnes$: Observable<number> = this._conseillersOnMapPresenter.nombreConseillersCoordonnes$;

  public userLocalisation?: Localisation;

  public constructor(
    @Inject(ASSETS_TOKEN) public assetsConfiguration: AssetsConfiguration,
    public readonly markersPresenter: MarkersPresenter,
    public readonly router: Router,
    public readonly route: ActivatedRoute,
    private readonly _coordinateursOnMapPresenter: CoordinateursOnMapPresenter,
    private readonly _conseillersOnMapPresenter: ConseillersOnMapPresenter
  ) {}

  public onHighlight = (highlightedId?: string): void => this.markersPresenter.highlight(highlightedId ?? '');

  public onShowDetails = (coordinateur: CoordinateurOnMapPresentation): void => {
    this.router.navigate([coordinateur.id, 'details'], { relativeTo: this.route.parent });
  };
}

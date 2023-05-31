import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { ASSETS_TOKEN, AssetsConfiguration } from '../../../../root';
import { MarkersPresenter } from '../../../core/presenters';
import { ConseillerOnMapPresentation, CoordinateurOnMapPresentation } from '../../presenters';
import { ConseillersRepository, CoordinateursRepository } from '../../reporitories';
import { CoordinateursOnMapPresenter } from './coordinateurs-on-map';
import { ConseillersOnMapPresenter } from './conseillers-on-map';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './coordinateurs.layout.html',
  providers: [
    {
      deps: [CoordinateursRepository],
      provide: CoordinateursOnMapPresenter,
      useClass: CoordinateursOnMapPresenter
    },
    {
      deps: [ConseillersRepository],
      provide: ConseillersOnMapPresenter,
      useClass: ConseillersOnMapPresenter
    }
  ]
})
export class CoordinateursLayout {
  public coordinateurs$: Observable<CoordinateurOnMapPresentation[]> = this._coordinateursOnMapPresenter.coordinateurs$();

  public conseillers$: Observable<ConseillerOnMapPresentation[]> = this._conseillersOnMapPresenter.conseillers$();

  public conseillerSelected?: ConseillerOnMapPresentation;

  public nombreConseillersNonCoordonnes$: Observable<number> = this._conseillersOnMapPresenter.nombreConseillersNonCoordonnes$;

  public nombreConseillersCoordonnes$: Observable<number> = this._conseillersOnMapPresenter.nombreConseillersCoordonnes$;

  public userLocalisation?: Localisation;

  public constructor(
    public readonly markersPresenter: MarkersPresenter,
    public readonly router: Router,
    public readonly route: ActivatedRoute,
    @Inject(ASSETS_TOKEN) public readonly assetsConfiguration: AssetsConfiguration,
    private readonly _coordinateursOnMapPresenter: CoordinateursOnMapPresenter,
    private readonly _conseillersOnMapPresenter: ConseillersOnMapPresenter
  ) {}

  public onHighlight = (highlightedId?: string): void => this.markersPresenter.highlight(highlightedId ?? '');

  public onShowDetails = (id: string): void => {
    id != '' && this.router.navigate([id, 'details'], { relativeTo: this.route });
  };

  public currentZoom: number = 0;
}

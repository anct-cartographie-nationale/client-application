import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { delay, Observable, switchMap, tap, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { ASSETS_TOKEN, AssetsConfiguration, SET_TITLE_ACTION, SetTitleAction } from '../../../../root';
import { MarkersPresenter } from '../../../core/presenters';
import { ConseillersRepository, CoordinateursRepository } from '../../reporitories';
import { ConseillerDetailsPresentation, CoordinateurDetailsPresentation } from './coordinateur-details.presentation';
import { CoordinateurDetailsPresenter } from './coordinateur-details.presenter';

const COORDINATEUR_ZOOM_LEVEL = 7 as const;

const byDistance = (conseillerA: ConseillerDetailsPresentation, conseillerB: ConseillerDetailsPresentation): number =>
  conseillerA.distance - conseillerB.distance;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './coordinateur-details.page.html',
  providers: [
    {
      deps: [ConseillersRepository, CoordinateursRepository],
      provide: CoordinateurDetailsPresenter,
      useClass: CoordinateurDetailsPresenter
    }
  ]
})
export class CoordinateurDetailsPage {
  public conseillerSelected?: ConseillerDetailsPresentation;

  public coordinateur$: Observable<CoordinateurDetailsPresentation | undefined> = this.route.paramMap.pipe(
    delay(0),
    switchMap((paramMap: ParamMap) => this._coordinateurDetailsPresenter.coordinateur$(paramMap.get('id') ?? '')),
    tap((coordinateur: CoordinateurDetailsPresentation | undefined): void => {
      if (!coordinateur) return;
      this.setTitle([coordinateur.nom, 'Fiche coordinateur']);
      this._markersPresenter.center(
        Localisation({ latitude: coordinateur.latitude, longitude: coordinateur.longitude }),
        COORDINATEUR_ZOOM_LEVEL
      );
      this._markersPresenter.select(coordinateur.id);
    })
  );

  public conseillers$: Observable<ConseillerDetailsPresentation[]> = this.route.paramMap.pipe(
    switchMap((paramMap: ParamMap) => this._coordinateurDetailsPresenter.coordinateur$(paramMap.get('id') ?? '')),
    switchMap((coordinateur: CoordinateurDetailsPresentation | undefined) =>
      coordinateur
        ? combineLatest([
            this._coordinateurDetailsPresenter.conseillersCoordonnesPar$(coordinateur),
            this._coordinateurDetailsPresenter.allConseillersInPerimeterOf$(coordinateur)
          ]).pipe(
            map(
              ([conseillersCoordonnes, autresConseillers]: [
                ConseillerDetailsPresentation[],
                ConseillerDetailsPresentation[]
              ]) => conseillersCoordonnes.concat(autresConseillers).sort(byDistance)
            )
          )
        : []
    )
  );

  public constructor(
    @Inject(ASSETS_TOKEN) public assetsConfiguration: AssetsConfiguration,
    @Inject(SET_TITLE_ACTION) readonly setTitle: SetTitleAction,
    public readonly route: ActivatedRoute,
    private readonly _coordinateurDetailsPresenter: CoordinateurDetailsPresenter,
    private readonly _markersPresenter: MarkersPresenter,
    private readonly _router: Router
  ) {}

  public closeDetails(): void {
    this._router.navigate(['..'], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve'
    });
    this._markersPresenter.reset();
  }
}

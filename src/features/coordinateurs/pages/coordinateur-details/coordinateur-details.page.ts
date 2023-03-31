import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { delay, Observable, switchMap, tap } from 'rxjs';
import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { ASSETS_TOKEN, AssetsConfiguration } from '../../../../root';
import { MarkersPresenter } from '../../../core';
import { coordinateurDetailsProviders } from './coordinateur-details.providers';
import { CoordinateurDetailsPresentation } from './coordinateur-details.presentation';
import { CoordinateurDetailsPresenter } from './coordinateur-details.presenter';

const COORDINATEUR_ZOOM_LEVEL = 7 as const;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './coordinateur-details.page.html',
  providers: coordinateurDetailsProviders
})
export class CoordinateurDetailsPage {
  public coordinateur$: Observable<CoordinateurDetailsPresentation | undefined> = this._route.paramMap.pipe(
    delay(0),
    switchMap((paramMap: ParamMap) => this._coordinateurDetailsPresenter.coordinateur$(paramMap.get('id') ?? '')),
    tap((coordinateur: CoordinateurDetailsPresentation | undefined): void => {
      if (!coordinateur) return;
      this._markersPresenter.center(
        Localisation({ latitude: coordinateur.latitude, longitude: coordinateur.longitude }),
        COORDINATEUR_ZOOM_LEVEL
      );
      this._markersPresenter.select(coordinateur.id);
    })
  );

  public constructor(
    @Inject(ASSETS_TOKEN) public assetsConfiguration: AssetsConfiguration,
    private readonly _coordinateurDetailsPresenter: CoordinateurDetailsPresenter,
    private readonly _markersPresenter: MarkersPresenter,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router
  ) {}

  public closeDetails(): void {
    this._router.navigate(['..'], {
      relativeTo: this._route,
      queryParamsHandling: 'preserve'
    });
    this._markersPresenter.reset();
  }
}

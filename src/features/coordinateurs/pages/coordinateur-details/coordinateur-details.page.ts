import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ASSETS_TOKEN, AssetsConfiguration } from '../../../../root';
import { coordinateurDetailsProviders } from './coordinateur-details.providers';
import { CoordinateurDetailsPresentation } from './coordinateur-details.presentation';
import { CoordinateurDetailsPresenter } from './coordinateur-details.presenter';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './coordinateur-details.page.html',
  providers: coordinateurDetailsProviders
})
export class CoordinateurDetailsPage {
  private _coordinateurId: string = this._route.snapshot.paramMap.get('id') ?? '';

  public coordinateur$: Observable<CoordinateurDetailsPresentation | undefined> =
    this._coordinateurDetailsPresenter.coordinateur$(this._coordinateurId);

  public constructor(
    @Inject(ASSETS_TOKEN) public assetsConfiguration: AssetsConfiguration,
    private readonly _coordinateurDetailsPresenter: CoordinateurDetailsPresenter,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router
  ) {}

  public closeDetails(): void {
    this._router.navigate(['..'], {
      relativeTo: this._route,
      queryParamsHandling: 'preserve'
    });
  }
}

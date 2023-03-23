import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ASSETS_TOKEN, AssetsConfiguration } from '../../../../root';
import { MarkersPresenter } from '../../../cartographie/presenters';
import { CoordinateursListItemPresentation } from './coordinateurs-list.presentation';
import { CoordinateursListPresenter } from './coordinateurs-list.presenter';
import { coordinateursListProviders } from './coordinateurs-list.providers';
import { ActivatedRoute } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './coordinateurs-list.page.html',
  providers: coordinateursListProviders
})
export class CoordinateursListPage {
  public coordinateurs$: Observable<CoordinateursListItemPresentation[]> = this._coordinateursListPresenter.coordinateurs$();

  public constructor(
    @Inject(ASSETS_TOKEN) public readonly assetsConfiguration: AssetsConfiguration,
    public readonly markersPresenter: MarkersPresenter,
    public readonly route: ActivatedRoute,
    private readonly _coordinateursListPresenter: CoordinateursListPresenter
  ) {}

  public trackByCoordinateurId = (_: number, coordinateur: CoordinateursListItemPresentation) => coordinateur.id;
}

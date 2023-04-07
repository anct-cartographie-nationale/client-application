import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ASSETS_TOKEN, AssetsConfiguration } from '../../../../root';
import { MarkersPresenter } from '../../../core';
import { CoordinateursLayout } from '../../layouts';
import { CoordinateursListItemPresentation } from './coordinateurs-list.presentation';
import { CoordinateursListPresenter } from './coordinateurs-list.presenter';
import { coordinateursListProviders } from './coordinateurs-list.providers';
import { CoordinateursSortPresentation, DEFAULT_SORT } from '../../presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './coordinateurs-list.page.html',
  providers: coordinateursListProviders
})
export class CoordinateursListPage {
  private _coordinateursSort$: BehaviorSubject<CoordinateursSortPresentation> =
    new BehaviorSubject<CoordinateursSortPresentation>(DEFAULT_SORT);

  public coordinateurs$: Observable<CoordinateursListItemPresentation[]> = this._coordinateursListPresenter.coordinateurs$(
    this._coordinateursSort$.asObservable()
  );

  public constructor(
    @Inject(ASSETS_TOKEN) public readonly assetsConfiguration: AssetsConfiguration,
    public readonly markersPresenter: MarkersPresenter,
    public readonly route: ActivatedRoute,
    private readonly _coordinateursListPresenter: CoordinateursListPresenter,
    private readonly _coordinateursLayout: CoordinateursLayout
  ) {}

  public trackByCoordinateurId = (_: number, coordinateur: CoordinateursListItemPresentation) => coordinateur.id;

  public onSortChange = (sort: CoordinateursSortPresentation): void => {
    this._coordinateursSort$.next(sort);
  };
}

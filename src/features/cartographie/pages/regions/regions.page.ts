import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  byCollectiviteTerritorialeNom,
  RegionPresentation,
  FilterPresentation,
  LieuxMediationNumeriquePresenter,
  Localisation,
  NO_LOCALISATION,
  toFilterFormPresentationFromQuery,
  toLocalisationFromFilterFormPresentation
} from '../../../core';
import { Observable, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MarkersPresenter } from '../../presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './regions.page.html'
})
export class RegionsPage {
  private _filterPresentation: FilterPresentation = toFilterFormPresentationFromQuery(this._route.snapshot.queryParams);

  private _localisation: Localisation = toLocalisationFromFilterFormPresentation(this._filterPresentation);

  private _lieuxMediationNumeriqueListPresenterArgs: [
    Observable<Localisation>,
    Observable<FilterPresentation>,
    Date,
    Observable<[Localisation, Localisation]>
  ] = [of(this._localisation), of(this._filterPresentation), new Date(), of([NO_LOCALISATION, NO_LOCALISATION])];

  public regions$: Observable<RegionPresentation[]> = this._lieuxMediationNumeriqueListPresenter
    .lieuxMediationNumeriqueByRegion$(...this._lieuxMediationNumeriqueListPresenterArgs)
    .pipe(map((regions: RegionPresentation[]): RegionPresentation[] => regions.sort(byCollectiviteTerritorialeNom)));

  public constructor(
    private readonly _route: ActivatedRoute,
    private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter,
    public readonly markersPresenter: MarkersPresenter
  ) {}
}

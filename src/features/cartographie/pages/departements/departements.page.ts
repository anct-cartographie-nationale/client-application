import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import {
  byCollectiviteTerritorialeNom,
  DepartementPresentation,
  FilterPresentation,
  LieuxMediationNumeriquePresenter,
  Localisation,
  NO_LOCALISATION,
  toFilterFormPresentationFromQuery,
  toLocalisationFromFilterFormPresentation,
  regions,
  RegionPresentation
} from '../../../core';
import { map } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MarkersPresenter } from '../../presenters';

const departementsFilteredByRegion = (departements: DepartementPresentation[], departementCodes: string[]) =>
  departements.filter(
    (departement: DepartementPresentation) => departementCodes.length === 0 || departementCodes.includes(departement.code)
  );

const toRegion = (paramMap: ParamMap): RegionPresentation | undefined =>
  regions.find((region: RegionPresentation) => region.nom === paramMap.get('nomRegion'));

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './departements.page.html'
})
export class DepartementsPage {
  private _filterPresentation: FilterPresentation = toFilterFormPresentationFromQuery(this._route.snapshot.queryParams);

  private _localisation: Localisation = toLocalisationFromFilterFormPresentation(this._filterPresentation);

  private _lieuxMediationNumeriqueListPresenterArgs: [
    Observable<Localisation>,
    Observable<FilterPresentation>,
    Date,
    Observable<[Localisation, Localisation]>
  ] = [of(this._localisation), of(this._filterPresentation), new Date(), of([NO_LOCALISATION, NO_LOCALISATION])];

  public departements$: Observable<DepartementPresentation[]> = combineLatest([
    this._lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDepartement$(
      ...this._lieuxMediationNumeriqueListPresenterArgs
    ),
    this._route.paramMap
  ]).pipe(
    map(([departements, paramMap]: [DepartementPresentation[], ParamMap]): DepartementPresentation[] =>
      departementsFilteredByRegion(departements, toRegion(paramMap)?.departements ?? []).sort(byCollectiviteTerritorialeNom)
    )
  );

  public constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter,
    public readonly markersPresenter: MarkersPresenter
  ) {}
}

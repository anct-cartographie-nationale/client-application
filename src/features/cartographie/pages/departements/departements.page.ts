import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import {
  byCollectiviteTerritorialeNom,
  DepartementPresentation,
  LieuxMediationNumeriquePresenter,
  regions,
  RegionPresentation
} from '../../../core';
import { map } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MarkersPresenter } from '../../presenters';
import { CartographieLayout } from '../../layouts';

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
  public departements$: Observable<DepartementPresentation[]> = combineLatest([
    this._cartographieLayout.departements$,
    this._route.paramMap
  ]).pipe(
    map(([departements, paramMap]: [DepartementPresentation[], ParamMap]): DepartementPresentation[] =>
      departementsFilteredByRegion(departements, toRegion(paramMap)?.departements ?? []).sort(byCollectiviteTerritorialeNom)
    )
  );

  public constructor(
    private readonly _cartographieLayout: CartographieLayout,
    private readonly _route: ActivatedRoute,
    private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter,
    public readonly markersPresenter: MarkersPresenter
  ) {}
}

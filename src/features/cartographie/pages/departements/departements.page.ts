import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import {
  byCollectiviteTerritorialeNom,
  DepartementPresentation,
  LieuxMediationNumeriquePresenter,
  regions,
  RegionPresentation,
  regionFromNom
} from '../../../core';
import { map } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MarkersPresenter } from '../../presenters';
import { CartographieLayout } from '../../layouts';

const departementsFilteredByRegion = (departements: DepartementPresentation[], departementCodes: string[]) =>
  departements.filter(
    (departement: DepartementPresentation) => departementCodes.length === 0 || departementCodes.includes(departement.code)
  );

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
      departementsFilteredByRegion(departements, regionFromNom(paramMap.get('nomRegion') ?? '')?.departements ?? []).sort(
        byCollectiviteTerritorialeNom
      )
    )
  );

  public hover(highlightedId?: string) {
    this.markersPresenter.hover(highlightedId ?? '');
  }

  public constructor(
    private readonly _cartographieLayout: CartographieLayout,
    private readonly _route: ActivatedRoute,
    private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter,
    public readonly markersPresenter: MarkersPresenter
  ) {}
}

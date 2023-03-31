import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  byCollectiviteTerritorialeNom,
  DepartementPresentation,
  regionFromNom,
  RegionPresentation,
  MarkersPresenter
} from '../../../core';
import { CartographieLayout } from '../../layouts';

const departementsFilteredByRegion = (departements: DepartementPresentation[], departementCodes: string[]) =>
  departements.filter(
    (departement: DepartementPresentation) => departementCodes.length === 0 || departementCodes.includes(departement.code)
  );

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './departements.page.html'
})
export class DepartementsPage implements OnInit {
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

  public constructor(
    private readonly _cartographieLayout: CartographieLayout,
    private readonly _route: ActivatedRoute,
    public readonly markersPresenter: MarkersPresenter
  ) {}

  public ngOnInit(): void {
    const region: RegionPresentation | undefined = regionFromNom(this._route.snapshot.paramMap.get('nomRegion') ?? '');
    region && this.markersPresenter.center(region.localisation, region.zoom);
  }

  public hover(highlightedId?: string) {
    this.markersPresenter.highlight(highlightedId ?? '');
  }
}

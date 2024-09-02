import { ChangeDetectionStrategy, Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  byCollectiviteTerritorialeNom,
  DepartementPresentation,
  regionFromNom,
  RegionPresentation,
  MarkersPresenter,
  WithLieuxCount
} from '../../../core/presenters';
import { CartographieLayout } from '../../layouts';
import { SET_TITLE_ACTION, SetTitleAction } from '../../../../root';

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
    map(([departements, paramMap]: [WithLieuxCount<DepartementPresentation[]>, ParamMap]): DepartementPresentation[] =>
      departementsFilteredByRegion(
        departements.payload,
        regionFromNom(paramMap.get('nomRegion') ?? '')?.departements ?? []
      ).sort(byCollectiviteTerritorialeNom)
    )
  );
  public constructor(
    private readonly _cartographieLayout: CartographieLayout,
    private readonly _route: ActivatedRoute,
    public readonly markersPresenter: MarkersPresenter,
    @Inject(SET_TITLE_ACTION) readonly setTitle: SetTitleAction
  ) {}

  public ngOnInit(): void {
    const region: RegionPresentation | undefined = regionFromNom(this._route.snapshot.paramMap.get('nomRegion') ?? '');
    if (region == null) return;
    this.setTitle([region.nom, 'Départements']);
    this.markersPresenter.center(region.localisation, region.zoom);
  }

  @HostListener('window:popstate')
  public onPopstate(): void {
    ['/cartographie', '/cartographie/regions'].includes(location.pathname) && this.markersPresenter.reset();
  }

  public hover(highlightedId?: string) {
    this.markersPresenter.highlight(highlightedId ?? '');
  }
}

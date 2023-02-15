import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FEATURES_TOKEN, FeaturesConfiguration } from '../../../../root';
import {
  byCollectiviteTerritorialeNom,
  DepartementPresentation,
  LieuxMediationNumeriquePresenter,
  regionFromNom,
  LieuMediationNumeriquePresentation,
  toLocalisationFromFilterFormPresentation,
  toFilterFormPresentationFromQuery
} from '../../../core';
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
    this.route.paramMap
  ]).pipe(
    map(([departements, paramMap]: [DepartementPresentation[], ParamMap]): DepartementPresentation[] =>
      departementsFilteredByRegion(departements, regionFromNom(paramMap.get('nomRegion') ?? '')?.departements ?? []).sort(
        byCollectiviteTerritorialeNom
      )
    )
  );

  public listOfLieuxWithoutFilters$: Observable<LieuMediationNumeriquePresentation[]> =
    this._lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(
      of(toLocalisationFromFilterFormPresentation(toFilterFormPresentationFromQuery(this.route.snapshot.queryParams))),
      undefined,
      new Date(),
      this.markersPresenter.boundingBox$
    );

  public constructor(
    private readonly _cartographieLayout: CartographieLayout,
    private readonly _router: Router,
    public readonly route: ActivatedRoute,
    private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter,
    public readonly markersPresenter: MarkersPresenter,
    @Inject(FEATURES_TOKEN)
    public readonly features: FeaturesConfiguration
  ) {}

  public hover(highlightedId?: string) {
    this.markersPresenter.hover(highlightedId ?? '');
  }

  public resetFilters(): void {
    this._router.navigate([], { relativeTo: this.route.parent });
  }

  public toQueryString(fromObject: {} = {}): string {
    return new HttpParams({ fromObject }).toString();
  }
}

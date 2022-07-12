import { Component } from '@angular/core';
import { Structure } from '@gouvfr-anct/mediation-numerique';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, Observable, of } from 'rxjs';
import { LieuxMediationNumeriqueListPresenter, LieuxMediationNumeriqueRepository, MarkersPresenter } from '../../../../domain';
import {
  FilterPresentation,
  toFilterFormPresentationFromQuery,
  toLocalisationFromFilterFormPresentation
} from '../../../../../orientation/domain/presenters/filter/filter.presenter';
import { Localisation } from '../../../../../../models/localisation/localisation';
import { map } from 'rxjs/operators';
import { toStructuresPresentation } from '../../models/structure';

@Component({
  templateUrl: './cartographie.layout.html',
  providers: [
    {
      deps: [LieuxMediationNumeriqueRepository],
      provide: LieuxMediationNumeriqueListPresenter,
      useClass: LieuxMediationNumeriqueListPresenter
    },
    MarkersPresenter
  ]
})
export class CartographieLayout {
  private _filterPresentation: FilterPresentation = toFilterFormPresentationFromQuery(this._route.snapshot.queryParams);

  private _localisation: Localisation = toLocalisationFromFilterFormPresentation(this._filterPresentation);

  public structures$: Observable<Structure[]> = this._lieuxMediationNumeriqueListPresenter
    .lieuxMediationNumeriqueByDistance$(of(this._localisation), of(this._filterPresentation))
    .pipe(map(toStructuresPresentation), delay(0));

  public constructor(
    private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter,
    public readonly markersPresenter: MarkersPresenter,
    private readonly _route: ActivatedRoute,
    private readonly router: Router
  ) {}

  public showDetailStructure(structure: Structure): void {
    this.markersPresenter.select(structure._id);
    this.router.navigate(['cartographie', structure._id]);
  }
}

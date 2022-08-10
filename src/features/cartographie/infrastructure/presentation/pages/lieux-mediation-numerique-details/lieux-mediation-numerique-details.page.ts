import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LieuxMediationNumeriqueDetailsPresenter, LieuxMediationNumeriqueRepository } from '../../../../domain';
import { LieuMediationNumeriqueDetailsPresentation } from '@features/cartographie/domain/presenters/lieux-mediation-numerique-details/lieu-mediation-numerique-details.presentation';
import { Localisation } from '../../../../../../models';
import {
  FilterPresentation,
  toFilterFormPresentationFromQuery,
  toLocalisationFromFilterFormPresentation
} from '../../../../../orientation/domain/presenters/filter/filter.presenter';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'lieux-mediation-numerique-details.page.html',
  providers: [
    {
      deps: [LieuxMediationNumeriqueRepository],
      provide: LieuxMediationNumeriqueDetailsPresenter,
      useClass: LieuxMediationNumeriqueDetailsPresenter
    }
  ]
})
export class LieuxMediationNumeriqueDetailsPage {
  private _filterPresentation: FilterPresentation = toFilterFormPresentationFromQuery(this._route.snapshot.queryParams);

  private _localisation: Localisation = toLocalisationFromFilterFormPresentation(this._filterPresentation);

  public lieuMediationNumerique$: Observable<LieuMediationNumeriqueDetailsPresentation> =
    this.lieuxMediationNumeriqueDetailsPresenter.lieuMediationNumeriqueFromParams$(
      this._route.params,
      new Date(),
      of(this._localisation)
    );

  public constructor(
    private readonly lieuxMediationNumeriqueDetailsPresenter: LieuxMediationNumeriqueDetailsPresenter,
    private readonly _route: ActivatedRoute
  ) {}

  public printPage() {
    window.print();
  }
}

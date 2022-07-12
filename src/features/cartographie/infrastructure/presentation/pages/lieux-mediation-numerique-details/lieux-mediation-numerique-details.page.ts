import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LieuxMediationNumeriqueDetailsPresenter, LieuxMediationNumeriqueRepository } from '../../../../domain';
import { LieuMediationNumeriqueListItemPresentation } from '@features/cartographie/domain/presenters/lieux-mediation-numerique-list/lieu-mediation-numerique-list-item.presentation';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      deps: [LieuxMediationNumeriqueRepository],
      provide: LieuxMediationNumeriqueDetailsPresenter,
      useClass: LieuxMediationNumeriqueDetailsPresenter
    }
  ],
  templateUrl: 'lieux-mediation-numerique-details.page.html'
})
export class LieuxMediationNumeriqueDetailsPage {
  public lieuMediationNumerique$: Observable<LieuMediationNumeriqueListItemPresentation> =
    this.lieuxMediationNumeriqueDetailsPresenter.lieuMediationNumeriqueFromParams$(this.route.params);

  public constructor(
    private readonly lieuxMediationNumeriqueDetailsPresenter: LieuxMediationNumeriqueDetailsPresenter,
    private readonly route: ActivatedRoute
  ) {}

  public printPage() {
    window.print();
  }
}

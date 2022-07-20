import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LieuxMediationNumeriqueDetailsPresenter, LieuxMediationNumeriqueRepository } from '../../../../domain';
import { LieuMediationNumeriqueDetailsPresentation } from '@features/cartographie/domain/presenters/lieux-mediation-numerique-details/lieu-mediation-numerique-details.presentation';

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
  public lieuMediationNumerique$: Observable<LieuMediationNumeriqueDetailsPresentation> =
    this.lieuxMediationNumeriqueDetailsPresenter.lieuMediationNumeriqueFromParams$(this.route.params);

  public constructor(
    private readonly lieuxMediationNumeriqueDetailsPresenter: LieuxMediationNumeriqueDetailsPresenter,
    private readonly route: ActivatedRoute
  ) {}

  public printPage() {
    window.print();
  }
}

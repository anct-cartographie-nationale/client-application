import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LieuxMediationNumeriqueListPresenter, LieuxMediationNumeriqueRepository, MarkersPresenter } from '../../../../domain';
import { NO_LOCALISATION } from '../../../../../../models/localisation/localisation';
import { LieuMediationNumerique } from '../../../../../../models/lieu-mediation-numerique/lieu-mediation-numerique';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      deps: [LieuxMediationNumeriqueRepository],
      provide: LieuxMediationNumeriqueListPresenter,
      useClass: LieuxMediationNumeriqueListPresenter
    }
  ],
  templateUrl: 'lieux-mediation-numerique-list.page.html'
})
export class LieuxMediationNumeriqueListPage {
  public lieuxMediationNumerique$: Observable<LieuMediationNumerique[]> =
    this.lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION));

  public constructor(
    private readonly lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter,
    public readonly markersPresenter: MarkersPresenter,
    private readonly router: Router
  ) {}

  public select(lieuMediationId: string) {
    this.markersPresenter.select(lieuMediationId);
  }

  public printPage() {
    window.print();
  }
}

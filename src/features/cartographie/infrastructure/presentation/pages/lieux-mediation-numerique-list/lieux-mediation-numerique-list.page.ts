import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
// import { Structure } from '@gouvfr-anct/mediation-numerique';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  LieuxMediationNumeriqueListPresenter,
  LieuxMediationNumeriqueRepository,
  MarkersPresenter,
  GeolocationPresenter
} from '../../../../domain';
import { NO_LOCALISATION } from '../../../../../../models/localisation/localisation';
import { LieuMediationNumerique } from '../../../../../../models/lieu-mediation-numerique/lieu-mediation-numerique';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    GeolocationPresenter,
    {
      deps: [LieuxMediationNumeriqueRepository],
      provide: LieuxMediationNumeriqueListPresenter,
      useClass: LieuxMediationNumeriqueListPresenter
    }
  ],
  templateUrl: 'lieux-mediation-numerique-list.page.html'
})
export class LieuxMediationNumeriqueListPage {
  // public structures$: Observable<Structure[]> = this.lieuxMediationNumeriqueListPresenter
  //   .lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION))
  //   .pipe(map(toStructuresPresentation));

  public lieuxMediationNumerique$: Observable<LieuMediationNumerique[]> =
    this.lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION));

  public constructor(
    public readonly geolocationPresenter: GeolocationPresenter,
    private readonly lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter,
    public readonly markersPresenter: MarkersPresenter,
    private readonly router: Router
  ) {}

  public select(lieuMediationId: string) {
    this.markersPresenter.select(lieuMediationId);
    this.router.navigate(['cartographie', lieuMediationId]);
  }

  public printPage() {
    window.print();
  }
}

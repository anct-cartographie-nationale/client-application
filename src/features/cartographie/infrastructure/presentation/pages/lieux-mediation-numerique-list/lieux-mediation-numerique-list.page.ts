import { ChangeDetectionStrategy, Component, Injectable } from '@angular/core';
import { Structure } from '@gouvfr-anct/mediation-numerique';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LieuxMediationNumeriqueListPresenter, LieuxMediationNumeriqueRepository, MarkersPresenter } from '../../../../domain';
import { toStructuresPresentation } from '../../models/structure';
import { map } from 'rxjs/operators';
import { NO_LOCALISATION } from '../../../../../../models/localisation/localisation';

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
@Injectable({
  providedIn: 'root'
})
export class LieuxMediationNumeriqueListPage {
  public structures$: Observable<Structure[]> = this.lieuxMediationNumeriqueListPresenter
    .lieuxMediationNumeriqueByDistance$(of(NO_LOCALISATION))
    .pipe(map(toStructuresPresentation));

  public constructor(
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

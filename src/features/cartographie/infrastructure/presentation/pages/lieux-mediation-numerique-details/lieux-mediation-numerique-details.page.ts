import { Component } from '@angular/core';
import { Structure } from '@gouvfr-anct/mediation-numerique';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LieuxMediationNumeriqueDetailsPresenter, LieuxMediationNumeriqueRepository } from '../../../../domain';

@Component({
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
  public structure$: Observable<Structure> = this.lieuxMediationNumeriqueDetailsPresenter.structureFromParams$(
    this.route.params
  );

  public constructor(
    private readonly lieuxMediationNumeriqueDetailsPresenter: LieuxMediationNumeriqueDetailsPresenter,
    private readonly route: ActivatedRoute
  ) {}
  public printPage() {
    window.print();
  }
}

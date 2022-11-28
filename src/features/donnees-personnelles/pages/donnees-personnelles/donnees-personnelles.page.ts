import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LieuxMediationNumeriquePresenter, LieuxMediationNumeriqueRepository } from '../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './donnees-personnelles.page.html',
  providers: [
    {
      deps: [LieuxMediationNumeriqueRepository],
      provide: LieuxMediationNumeriquePresenter,
      useClass: LieuxMediationNumeriquePresenter
    }
  ]
})
export class DonneesPersonnellesLayout {}

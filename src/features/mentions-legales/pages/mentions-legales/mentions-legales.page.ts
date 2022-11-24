import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LieuxMediationNumeriquePresenter, LieuxMediationNumeriqueRepository } from '../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mentions-legales.page.html',
  providers: [
    {
      deps: [LieuxMediationNumeriqueRepository],
      provide: LieuxMediationNumeriquePresenter,
      useClass: LieuxMediationNumeriquePresenter
    }
  ],
  styleUrls: ['./mentions-legales.page.scss']
})
export class MentionsLegalesLayout {}

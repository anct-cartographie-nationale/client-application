import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import {
  LieuMediationNumeriquePresentation,
  LieuxMediationNumeriquePresenter,
  LieuxMediationNumeriqueRepository
} from '../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './presentation.layout.html',
  providers: [
    {
      deps: [LieuxMediationNumeriqueRepository],
      provide: LieuxMediationNumeriquePresenter,
      useClass: LieuxMediationNumeriquePresenter
    }
  ]
})
export class PresentationLayout {
  public environment: Boolean = environment.production;
  public lieuxMediationNumeriqueTotal$: Observable<LieuMediationNumeriquePresentation[]> =
    this._lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueTotal$();

  public constructor(private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter) {}
}

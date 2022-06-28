import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from '../../animation';
import {
  GeolocationPresenter,
  LieuxMediationNumeriqueListPresenter,
  LieuxMediationNumeriqueRepository
} from '../../../../../cartographie/domain';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LieuMediationNumerique } from '../../../../../../models/lieu-mediation-numerique/lieu-mediation-numerique';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './orientation.layout.html',
  animations: [
    slideInAnimation([
      ['DemarrerPage', 'BesoinPage'],
      ['DemarrerPage', 'LocalisationPage'],
      ['DemarrerPage', 'SpecificitePage'],
      ['DemarrerPage', 'DatePage'],
      ['BesoinPage', 'LocalisationPage'],
      ['BesoinPage', 'SpecificitePage'],
      ['BesoinPage', 'DatePage'],
      ['LocalisationPage', 'SpecificitePage'],
      ['LocalisationPage', 'DatePage'],
      ['SpecificitePage', 'DatePage']
    ])
  ],
  providers: [
    GeolocationPresenter,
    {
      deps: [LieuxMediationNumeriqueRepository],
      provide: LieuxMediationNumeriqueListPresenter,
      useClass: LieuxMediationNumeriqueListPresenter
    }
  ]
})
export class OrientationLayout {
  public filter$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public lieuxMediationNumerique$: Observable<LieuMediationNumerique[]> =
    this.lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(
      this.geolocationPresenter.location$,
      this.filter$
    );

  public constructor(
    private readonly lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter,
    public readonly geolocationPresenter: GeolocationPresenter,
    private contexts: ChildrenOutletContexts
  ) {}

  public getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}

import { ChangeDetectionStrategy, Component, Injectable } from '@angular/core';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { slideInAnimation } from '../../animation';
import {
  GeolocationPresenter,
  LieuxMediationNumeriqueListPresenter,
  LieuxMediationNumeriqueRepository
} from '../../../../../cartographie/domain';
import { Observable } from 'rxjs';
import { LieuMediationNumerique } from '../../../../../../models/lieu-mediation-numerique/lieu-mediation-numerique';
import { FilterPresenter } from '../../../../domain/presenters/filter/filter.presenter';

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
    FilterPresenter,
    {
      deps: [LieuxMediationNumeriqueRepository],
      provide: LieuxMediationNumeriqueListPresenter,
      useClass: LieuxMediationNumeriqueListPresenter
    }
  ]
})
export class OrientationLayout {
  public lieuxMediationNumerique$: Observable<LieuMediationNumerique[]> =
    this.lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(
      this.geolocationPresenter.location$,
      this.filterPresenter.filters$
    );

  public lieuxMediationNumeriqueTotal$: Observable<LieuMediationNumerique[]> =
    this.lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueTotal$();

  public constructor(
    public router: Router,
    private readonly lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter,
    public readonly geolocationPresenter: GeolocationPresenter,
    public readonly filterPresenter: FilterPresenter,
    private contexts: ChildrenOutletContexts
  ) {}

  public getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}

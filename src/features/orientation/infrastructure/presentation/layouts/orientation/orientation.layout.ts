import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { slideInAnimation } from '../../animation';
import {
  GeolocationPresenter,
  LieuxMediationNumeriqueListPresenter,
  LieuxMediationNumeriqueRepository
} from '../../../../../cartographie/domain';
import { defaultIfEmpty, Observable, startWith } from 'rxjs';
import { LieuMediationNumerique } from '../../../../../../models/lieu-mediation-numerique/lieu-mediation-numerique';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterPresentation } from '../../../../domain/presenters/filter/filter.presenter';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './orientation.layout.html',
  animations: [
    slideInAnimation([
      ['DemarrerPage', 'BesoinPage'],
      ['DemarrerPage', 'LocalisationPage'],
      ['DemarrerPage', 'AccessibilitePage'],
      ['DemarrerPage', 'DatePage'],
      ['BesoinPage', 'LocalisationPage'],
      ['BesoinPage', 'AccessibilitePage'],
      ['BesoinPage', 'DatePage'],
      ['LocalisationPage', 'AccessibilitePage'],
      ['LocalisationPage', 'DatePage'],
      ['AccessibilitePage', 'DatePage']
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
  public filterForm = new FormGroup({});

  private filter$: Observable<FilterPresentation | undefined> = this.filterForm.valueChanges.pipe(startWith(undefined));

  public lieuxMediationNumerique$: Observable<LieuMediationNumerique[]> =
    this.lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(
      this.geolocationPresenter.location$,
      this.filter$
    );

  public lieuxMediationNumeriqueTotal$: Observable<LieuMediationNumerique[]> =
    this.lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueTotal$();

  public constructor(
    public router: Router,
    private readonly lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter,
    public readonly geolocationPresenter: GeolocationPresenter,
    private contexts: ChildrenOutletContexts
  ) {}

  public getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}

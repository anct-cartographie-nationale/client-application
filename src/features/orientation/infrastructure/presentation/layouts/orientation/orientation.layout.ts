import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, ChildrenOutletContexts, Router } from '@angular/router';
import { slideInAnimation } from '../../animation';
import { LieuxMediationNumeriqueListPresenter, LieuxMediationNumeriqueRepository } from '../../../../../cartographie/domain';
import { delay, Observable, startWith, tap } from 'rxjs';
import { LieuMediationNumerique } from '../../../../../../models/lieu-mediation-numerique/lieu-mediation-numerique';
import { FormControl, FormGroup } from '@angular/forms';
import {
  FilterFormPresentation,
  FilterPresentation,
  toFilterFormPresentationFromQuery,
  toLocalisationFromFilterFormPresentation
} from '../../../../domain/presenters/filter/filter.presenter';
import { LieuMediationNumeriqueListItemPresentation } from '../../../../../cartographie/domain/presenters/lieux-mediation-numerique-list/lieu-mediation-numerique-list-item.presentation';
import { Localisation } from '../../../../../../models/localisation/localisation';
import { map } from 'rxjs/operators';

const createFormGroupFromFilterPresentation = (filterPresentation: FilterPresentation): FormGroup =>
  Object.entries(filterPresentation).reduce(
    (formGroup: FormGroup, [field, value]: [string, FilterPresentation[keyof FilterPresentation]]): FormGroup =>
      new FormGroup({
        ...formGroup.controls,
        [field]: new FormControl(value)
      }),
    new FormGroup({})
  );

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
    {
      deps: [LieuxMediationNumeriqueRepository],
      provide: LieuxMediationNumeriqueListPresenter,
      useClass: LieuxMediationNumeriqueListPresenter
    }
  ]
})
export class OrientationLayout {
  public filterForm: FormGroup = createFormGroupFromFilterPresentation(
    toFilterFormPresentationFromQuery(this._route.snapshot.queryParams)
  );

  private _filterPresentation$: Observable<FilterPresentation> = this.filterForm.valueChanges.pipe(
    startWith<FilterFormPresentation>(toFilterFormPresentationFromQuery(this._route.snapshot.queryParams))
  );

  private _localisation$: Observable<Localisation> = this._filterPresentation$.pipe(
    map(toLocalisationFromFilterFormPresentation)
  );

  private _filter$: Observable<FilterPresentation> = this._filterPresentation$.pipe(
    delay(0),
    tap(this.setFilterToQueryString())
  );

  public lieuxMediationNumerique$: Observable<LieuMediationNumeriqueListItemPresentation[]> =
    this._lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(this._localisation$, this._filter$);

  public lieuxMediationNumeriqueTotal$: Observable<LieuMediationNumerique[]> =
    this._lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueTotal$();

  public constructor(
    private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter,
    private readonly _contexts: ChildrenOutletContexts,
    private readonly _route: ActivatedRoute,
    public readonly router: Router
  ) {}

  public getRouteAnimationData(): string {
    return this._contexts.getContext('primary')?.route?.snapshot.data?.['animation'];
  }

  private setFilterToQueryString(): (queryParams: FilterPresentation) => Promise<boolean> {
    return (queryParams: FilterPresentation) => this.router.navigate([], { queryParams });
  }
}

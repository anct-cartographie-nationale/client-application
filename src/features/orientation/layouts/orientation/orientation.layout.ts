import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ChildrenOutletContexts, Router } from '@angular/router';
import { BehaviorSubject, delay, Observable, startWith, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { LieuMediationNumerique, Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import {
  ASSETS_TOKEN,
  AssetsConfiguration,
  BRAND_TOKEN,
  BrandConfiguration,
  FEATURES_TOKEN,
  FeaturesConfiguration
} from '../../../../root';
import {
  FilterFormPresentation,
  FilterPresentation,
  LieuMediationNumeriquePresentation,
  LieuxMediationNumeriquePresenter,
  toFilterFormPresentationFromQuery,
  toLocalisationFromFilterFormPresentation,
  onlyWithLocalisation
} from '../../../core/presenters';
import { LieuxMediationNumeriqueRepository } from '../../../core/repositories';
import { slideInAnimation } from '../../animations';

const createFormGroupFromFilterPresentation = (filterPresentation: FilterPresentation): FormGroup =>
  Object.entries(filterPresentation).reduce(
    (formGroup: FormGroup, [field, value]: [string, FilterPresentation[keyof FilterPresentation]]): FormGroup =>
      new FormGroup({
        ...formGroup.controls,
        [field]: new FormControl(value)
      }),
    new FormGroup({})
  );

const toLieuxWithLocalisation = (lieux: LieuMediationNumerique[]) => lieux.filter(onlyWithLocalisation);

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './orientation.layout.html',
  animations: [
    slideInAnimation([
      ['DemarrerPage', 'BesoinPage'],
      ['DemarrerPage', 'LocalisationPage'],
      ['DemarrerPage', 'AccessibilitePage'],
      ['DemarrerPage', 'DisponibilitePage'],
      ['BesoinPage', 'LocalisationPage'],
      ['BesoinPage', 'AccessibilitePage'],
      ['BesoinPage', 'DisponibilitePage'],
      ['LocalisationPage', 'AccessibilitePage'],
      ['LocalisationPage', 'DisponibilitePage'],
      ['AccessibilitePage', 'DisponibilitePage']
    ])
  ],
  providers: [
    {
      deps: [LieuxMediationNumeriqueRepository],
      provide: LieuxMediationNumeriquePresenter,
      useClass: LieuxMediationNumeriquePresenter
    }
  ]
})
export class OrientationLayout {
  private _lieuxMediationNumeriqueCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public lieuxMediationNumeriqueCount$: Observable<number> = this._lieuxMediationNumeriqueCount$.asObservable();

  public hideArrow: boolean = false;

  public filterForm: FormGroup = createFormGroupFromFilterPresentation(
    toFilterFormPresentationFromQuery(this.route.snapshot.queryParams)
  );

  public filterPresentation$: Observable<FilterFormPresentation> = this.filterForm.valueChanges.pipe(
    startWith<FilterFormPresentation>(toFilterFormPresentationFromQuery(this.route.snapshot.queryParams))
  );

  private _localisation$: Observable<Localisation> = this.filterPresentation$.pipe(
    map(toLocalisationFromFilterFormPresentation)
  );

  private _filter$: Observable<FilterPresentation> = this.filterPresentation$.pipe(
    delay(0),
    tap(this.setFilterToQueryString())
  );

  public lieuxMediationNumerique$: Observable<LieuMediationNumeriquePresentation[]> = this._lieuxMediationNumeriqueListPresenter
    .lieuxMediationNumeriqueByDistance$(this._localisation$, this._filter$)
    .pipe(
      tap((lieuxMediationNumerique: LieuMediationNumeriquePresentation[]) =>
        this._lieuxMediationNumeriqueCount$.next(lieuxMediationNumerique.length)
      )
    );

  public lieuxMediationNumeriqueTotal$: Observable<LieuMediationNumerique[]> =
    this._lieuxMediationNumeriqueListPresenter.lieuxMediationNumerique$.pipe(map(toLieuxWithLocalisation));

  public constructor(
    @Inject(FEATURES_TOKEN)
    public readonly features: FeaturesConfiguration,
    @Inject(ASSETS_TOKEN) public assetsConfiguration: AssetsConfiguration,
    @Inject(BRAND_TOKEN) public readonly brandConfiguration: BrandConfiguration,
    private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter,
    private readonly _contexts: ChildrenOutletContexts,
    public readonly route: ActivatedRoute,
    public readonly router: Router
  ) {}

  public getRouteAnimationData(): string {
    return this._contexts.getContext('primary')?.route?.snapshot.data?.['animation'];
  }

  private setFilterToQueryString(): (queryParams: FilterPresentation) => Promise<boolean> {
    return (queryParams: FilterPresentation) =>
      this.router.navigate([], {
        queryParams: {
          ...queryParams,
          horaires_ouverture: JSON.stringify(queryParams.horaires_ouverture)
        }
      });
  }

  public hasFilterValue(filter: FilterPresentation): boolean {
    for (let key in filter) {
      const value = filter[key as keyof FilterPresentation];

      if (value != null && value !== '') {
        if (!Array.isArray(value)) {
          return true;
        } else if (value.length > 0 && value.some((item) => this.hasValue(item))) {
          return true;
        }
      }
    }

    return false;
  }

  private hasValue(value: any): boolean {
    if (Array.isArray(value)) {
      return value.some((item) => this.hasValue(item));
    }

    return value != null && value !== '';
  }
}

import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  onlyWithLocalisation,
  hasActiveFilter,
  createFormGroupFromFilterPresentation
} from '../../../core/presenters';
import { LieuxMediationNumeriqueRepository } from '../../../core/repositories';
import { slideInAnimation } from '../../animations';

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
  private _lieuxMediationNumeriqueCount$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

  public lieuxMediationNumeriqueCount$: Observable<number | null> = this._lieuxMediationNumeriqueCount$.asObservable();

  public hideArrow: boolean = false;

  public filterForm: FormGroup = createFormGroupFromFilterPresentation(
    toFilterFormPresentationFromQuery(this.route.snapshot.queryParams)
  );

  public lastFilterAdded: { key: string; value: string } | null = null;

  public addLastFilter(value: string, key: string, event?: Event) {
    const shouldUpdate: boolean = key === 'prise_en_charge_specifique' ? (event?.target as HTMLInputElement).checked : true;
    if (shouldUpdate) this.lastFilterAdded = { key, value };
  }

  public deleteLastFilter() {
    if (this.lastFilterAdded) {
      if (this.lastFilterAdded.key === 'services') this.filterForm.get('services')?.reset();
      else if (this.lastFilterAdded.key === 'horaires_ouverture') this.filterForm.get(this.lastFilterAdded.key)?.reset();
      else if (['address', 'latitude', 'distance'].includes(this.lastFilterAdded.key))
        ['address', 'distance', 'latitude', 'longitude'].forEach((key) => this.filterForm.get(key)?.reset());
      else {
        const keyArrayCopy = [...this.filterForm.value[this.lastFilterAdded.key]];
        const indexOfValue = keyArrayCopy.indexOf(this.lastFilterAdded.value);
        indexOfValue > -1 && keyArrayCopy.splice(indexOfValue, 1);
        this.filterForm.get(this.lastFilterAdded.key)?.setValue([...keyArrayCopy]);
      }
    }
  }

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
          ...(queryParams.horaires_ouverture ? { horaires_ouverture: JSON.stringify(queryParams.horaires_ouverture) } : {})
        }
      });
  }

  public hasActiveFilter = hasActiveFilter;
}

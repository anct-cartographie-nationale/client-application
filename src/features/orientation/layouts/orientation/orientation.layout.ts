import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ChildrenOutletContexts, Router } from '@angular/router';
import { BehaviorSubject, delay, Observable, startWith, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { FEATURES_TOKEN, FeaturesConfiguration } from '../../../../root';
import {
  FilterFormPresentation,
  FilterPresentation,
  LieuMediationNumerique,
  LieuMediationNumeriquePresentation,
  LieuxMediationNumeriquePresenter,
  LieuxMediationNumeriqueRepository,
  Localisation,
  toFilterFormPresentationFromQuery,
  toLocalisationFromFilterFormPresentation
} from '../../../core';
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
    this._lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueTotal$;

  public constructor(
    @Inject(FEATURES_TOKEN)
    public readonly features: FeaturesConfiguration,
    private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter,
    private readonly _contexts: ChildrenOutletContexts,
    public readonly route: ActivatedRoute,
    public readonly router: Router
  ) {}

  public toQueryString(fromObject: {} = {}): string {
    return new HttpParams({ fromObject }).toString();
  }

  public getRouteAnimationData(): string {
    return this._contexts.getContext('primary')?.route?.snapshot.data?.['animation'];
  }

  private setFilterToQueryString(): (queryParams: FilterPresentation) => Promise<boolean> {
    return (queryParams: FilterPresentation) => this.router.navigate([], { queryParams });
  }

  public resetForm(value: string | number, key: string) {
    if (key === 'services') this.filterForm.get('services')?.setValue('');
    else if (key === 'distance') {
      this.filterForm.get('distance')?.setValue('');
    } else if (key === 'address') {
      this.filterForm.get('address')?.setValue('');
      this.filterForm.get('distance')?.setValue('');
      this.filterForm.get('latitude')?.setValue('');
      this.filterForm.get('longitude')?.setValue('');
    } else {
      const keyArrayCoppy = [...this.filterForm.value[key]];
      const indexOfValue = keyArrayCoppy.indexOf(value);
      indexOfValue > -1 && keyArrayCoppy.splice(indexOfValue, 1);
      this.filterForm.get(key)?.setValue([...keyArrayCoppy]);
    }
  }

  public formatDistance(distance: string | number): string {
    if (distance === 100000 || distance === '100000') return 'Moins de 100 km';
    else if (distance === 20000 || distance === '20000') return 'Moins de 20 km';
    else return 'Moins de 5 km';
  }
}

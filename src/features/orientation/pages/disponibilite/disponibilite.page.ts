import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FilterFormPresentation,
  FilterPresentation,
  LieuMediationNumeriquePresentation,
  LieuxMediationNumeriquePresenter,
  Localisation,
  toFilterFormPresentationFromQuery,
  toLocalisationFromFilterFormPresentation
} from '@features/core';
import { map, Observable, startWith, delay, tap } from 'rxjs';
import { FEATURES_TOKEN, FeaturesConfiguration } from '../../../../root';
import { createFormGroupFromFilterPresentation, OrientationLayout } from '../../layouts';

const currentDate = () => new Date().toISOString().substring(0, 10);

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './disponibilite.page.html'
})
export class DisponibilitePage {
  public ouvertActuellementFormControl: FormControl = new FormControl(
    this.orientationLayout.filterForm.get('ouvert_actuellement')?.value
  );

  public filterForm: FormGroup = createFormGroupFromFilterPresentation(
    toFilterFormPresentationFromQuery(this.route.snapshot.queryParams)
  );

  public filterPresentation$: Observable<FilterPresentation> = this.filterForm.valueChanges.pipe(
    startWith<FilterFormPresentation>(toFilterFormPresentationFromQuery(this.route.snapshot.queryParams))
  );

  public _localisation$: Observable<Localisation> = this.filterPresentation$.pipe(
    map(toLocalisationFromFilterFormPresentation)
  );

  public _filter$: Observable<FilterPresentation> = this.filterPresentation$.pipe(delay(0), tap(this.setFilterToQueryString()));

  public lieuxMediationNumerique$: Observable<LieuMediationNumeriquePresentation[]> =
    this._lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(this._localisation$, this._filter$);

  private setFilterToQueryString(): (queryParams: FilterPresentation) => Promise<boolean> {
    return (queryParams: FilterPresentation) => this.router.navigate([], { queryParams });
  }

  public constructor(
    @Inject(FEATURES_TOKEN)
    public readonly features: FeaturesConfiguration,
    public readonly route: ActivatedRoute,
    private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter,
    public readonly orientationLayout: OrientationLayout,
    public readonly router: Router
  ) {}

  private clearDateOuverture(): void {
    this.orientationLayout.filterForm.get('date_ouverture')?.reset();
    this.ouvertActuellementFormControl.reset();
  }

  private clearOuvertActuellement(): void {
    this.orientationLayout.filterForm.get('ouvert_actuellement')?.reset();
    this.ouvertActuellementFormControl.reset();
  }

  private setDateOuverture(dateOuverture: string = currentDate()): void {
    this.orientationLayout.filterForm.get('date_ouverture')?.setValue(dateOuverture);
  }

  private setOuvertActuellement(): void {
    this.setDateOuverture();
    this.orientationLayout.filterForm.get('ouvert_actuellement')?.setValue('true');
  }

  public setDateOuvertureToNow(event: Event & { target: HTMLInputElement }) {
    event.target.checked ? this.setOuvertActuellement() : this.clearOuvertActuellement();
  }

  public selectDate(event: Event & { target: HTMLInputElement }) {
    this.clearOuvertActuellement();
    event.target.value === '' ? this.clearDateOuverture() : this.setDateOuverture(event.target.value);
  }
}

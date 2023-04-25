import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, Observable, of, Subject, switchMap } from 'rxjs';
import { map, mergeWith } from 'rxjs/operators';
import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { AddressFoundPresentation, AddressPresenter, AddressRepository } from '../../../adresse';
import { FilterPresentation, LieuxMediationNumeriquePresenter, toFilterFormPresentationFromQuery } from '../../../core';
import { OrientationLayout } from '../../layouts';
import { countByDistance, DistanceRange, localisationFromStrings } from './localisation.presenter';

const MIN_SEARCH_TERM_LENGTH: number = 3;
const SEARCH_DEBOUNCE_TIME: number = 300;

const toFiltersWithoutDistance = (filterPresentation: FilterPresentation): FilterPresentation => {
  const { distance, ...newFilters } = filterPresentation;
  return newFilters;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      deps: [AddressRepository],
      provide: AddressPresenter,
      useClass: AddressPresenter
    }
  ],
  templateUrl: './localisation.page.html'
})
export class LocalisationPage {
  private readonly _searchTerm$: Subject<string> = new Subject<string>();

  public addressesFound$: Observable<AddressFoundPresentation[]> = this._searchTerm$.pipe(
    map((searchTerm: string): string => searchTerm.trim()),
    filter((searchTerm: string): boolean => searchTerm.length >= MIN_SEARCH_TERM_LENGTH),
    debounceTime(SEARCH_DEBOUNCE_TIME),
    distinctUntilChanged(),
    switchMap((searchTerm: string): Observable<AddressFoundPresentation[]> => this._addressPresenter.search$(searchTerm))
  );

  public addressNotFound$: Observable<boolean> = of(false);

  private _localisation$: BehaviorSubject<Localisation> = new BehaviorSubject<Localisation>(
    localisationFromStrings(this._route.snapshot.queryParams['latitude'], this._route.snapshot.queryParams['longitude'])
  );

  private _filters$: Observable<FilterPresentation> = of(
    toFilterFormPresentationFromQuery(this._route.snapshot.queryParams)
  ).pipe(mergeWith(this.orientationLayout.filterForm.valueChanges), map(toFiltersWithoutDistance));

  public lieuxMediationNumeriqueByDistanceRange$: Observable<DistanceRange[]> = this._lieuxMediationNumeriqueListPresenter
    .lieuxMediationNumeriqueByDistance$(this._localisation$, this._filters$)
    .pipe(map(countByDistance));

  private _geoLocation$: Subject<Localisation> = new Subject<Localisation>();

  private _loadingState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loadingState$: Observable<boolean> = this._loadingState$.pipe(
    mergeWith(
      this._geoLocation$.pipe(
        switchMap(
          (localisation: Localisation): Observable<AddressFoundPresentation[]> => this._addressPresenter.reverse$(localisation)
        ),
        map((address: AddressFoundPresentation[]) => {
          this.orientationLayout.filterForm.get('address')?.setValue(address[0].label);
          return false;
        })
      )
    )
  );

  public constructor(
    private readonly _addressPresenter: AddressPresenter,
    private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter,
    public readonly _route: ActivatedRoute,
    public readonly orientationLayout: OrientationLayout
  ) {}

  public onSelectAddress(address: AddressFoundPresentation): void {
    this.orientationLayout.filterForm.get('address')?.setValue(address.label);
    this.orientationLayout.filterForm.get('latitude')?.setValue(address.localisation.latitude);
    this.orientationLayout.filterForm.get('longitude')?.setValue(address.localisation.longitude);
    this.orientationLayout.filterForm.get('distance')?.setValue(30000);
    this._localisation$.next(address.localisation);
  }

  public onResetAddress(): void {
    this.orientationLayout.filterForm.get('address')?.reset();
    this.orientationLayout.filterForm.get('latitude')?.reset();
    this.orientationLayout.filterForm.get('longitude')?.reset();
    this.orientationLayout.filterForm.get('distance')?.reset();
  }

  public onGeoLocate(): void {
    console.log('onGeoLocate');
    this._loadingState$.next(true);
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition): void => {
      console.log(position);
      this.orientationLayout.filterForm.get('latitude')?.setValue(position.coords.latitude);
      this.orientationLayout.filterForm.get('longitude')?.setValue(position.coords.longitude);
      this.orientationLayout.filterForm.get('distance')?.setValue(30000);
      this.orientationLayout.filterForm.get('address')?.setValue(null);
      this._geoLocation$.next(Localisation({ latitude: position.coords.latitude, longitude: position.coords.longitude }));
      this._localisation$.next(Localisation({ latitude: position.coords.latitude, longitude: position.coords.longitude }));
    });
  }

  public onSearchAddress(searchTerm: string): void {
    this._searchTerm$.next(searchTerm);
  }
}

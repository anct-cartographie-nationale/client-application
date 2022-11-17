import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, Observable, of, Subject, switchMap } from 'rxjs';
import { map, mergeWith } from 'rxjs/operators';
import { AddressFoundPresentation, AddressPresenter, AddressRepository } from '../../../adresse';
import { Localisation } from '../../../core';
import { OrientationLayout } from '../../layouts';

const MIN_SEARCH_TERM_LENGTH: number = 3;
const SEARCH_DEBOUNCE_TIME: number = 300;

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

  public constructor(
    private readonly _addressPresenter: AddressPresenter,
    public readonly orientationLayout: OrientationLayout
  ) {}

  public onSelectAddress(address: AddressFoundPresentation): void {
    this.orientationLayout.filterForm.get('latitude')?.setValue(address.localisation.latitude);
    this.orientationLayout.filterForm.get('longitude')?.setValue(address.localisation.longitude);
    this.orientationLayout.filterForm.get('distance')?.setValue('100000');
  }

  public onGeoLocate(): void {
    this._loadingState$.next(true);
    window.navigator.geolocation.getCurrentPosition((position: GeolocationPosition): void => {
      this.orientationLayout.filterForm.get('latitude')?.setValue(position.coords.latitude);
      this.orientationLayout.filterForm.get('longitude')?.setValue(position.coords.longitude);
      this.orientationLayout.filterForm.get('distance')?.setValue('100000');
      this.orientationLayout.filterForm.get('address')?.setValue(null);
      this._geoLocation$.next(
        Localisation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      );
    });
  }

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

  public onSearchAddress(searchTerm: string): void {
    this._searchTerm$.next(searchTerm);
  }
}

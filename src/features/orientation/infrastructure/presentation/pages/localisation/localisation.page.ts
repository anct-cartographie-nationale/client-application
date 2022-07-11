import { ChangeDetectionStrategy, Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, Observable, of, Subject, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddressPresenter } from '../../../../domain/presenters';
import { AddressRepository } from '../../../../domain/repositories';
import { AddressFoundPresentation } from '../../../../domain/presenters/address/address-found.presentation';
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
  }

  public onGeoLocate(): void {
    window.navigator.geolocation.getCurrentPosition((position: GeolocationPosition): void => {
      this.orientationLayout.filterForm.get('latitude')?.setValue(position.coords.latitude);
      this.orientationLayout.filterForm.get('longitude')?.setValue(position.coords.longitude);
      this.orientationLayout.filterForm.get('address')?.setValue(null);
    });
  }

  public onSearchAddress(searchTerm: string): void {
    this._searchTerm$.next(searchTerm);
  }
}

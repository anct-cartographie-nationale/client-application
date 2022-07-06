import { ChangeDetectionStrategy, Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, Observable, of, Subject, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddressPresenter } from '../../../../domain/presenters';
import { AddressRepository } from '../../../../domain/repositories';
import { GeolocationPresenter } from '../../../../../cartographie/domain';
import { Localisation } from '../../../../../../models/localisation/localisation';
import { AddressFoundPresentation } from '../../../../domain/presenters/address/address-found.presentation';
import { FormControl } from '@angular/forms';
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
  templateUrl: 'localisation.page.html'
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
    public readonly geolocationPresenter: GeolocationPresenter,
    public readonly orientationLayout: OrientationLayout
  ) {
    orientationLayout.filterForm.addControl('distance', new FormControl());
  }

  public onSelectAddress(address: AddressFoundPresentation): void {
    this.geolocationPresenter.setLocalisation(address.localisation);
  }

  public onGeoLocate(): void {
    window.navigator.geolocation.getCurrentPosition((position: GeolocationPosition): void =>
      this.geolocationPresenter.setLocalisation(
        Localisation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      )
    );
  }

  public onSearchAddress(searchTerm: string): void {
    this._searchTerm$.next(searchTerm);
  }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  forkJoin,
  Observable,
  of,
  Subject,
  switchMap,
  tap
} from 'rxjs';
import { map } from 'rxjs/operators';
import { Localisation } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { ZOOM_LEVEL_TOKEN, ZoomLevelConfiguration } from '../../../../root';
import { MarkersPresenter } from '../../../core/presenters';
import { Searchable, SEARCHABLE_TOKEN } from '../../configuration';
import { ResultFoundPresentation } from '../../presenters';
import { AddressType } from '../../models';

const MIN_SEARCH_TERM_LENGTH: number = 3;
const SEARCH_DEBOUNCE_TIME: number = 300;

const setZoomUserPosition = (defaultUserPosition: number, distance?: number): number =>
  distance ? (distance >= 50000 && distance <= 100000 ? 8 : 10) : defaultUserPosition;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-user-location',
  templateUrl: './user-location.component.html'
})
export class UserLocationComponent implements OnInit {
  @Input() adresse?: string;

  @Input() fullWidth: boolean = false;

  @Input() placeholder: string = 'Entrez une adresse';

  private readonly _initialSearch$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private readonly _searchTerm$: Subject<string> = new Subject<string>();

  private readonly _displayGeolocation$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private readonly _loadingState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public readonly loadingState$: Observable<boolean> = this._loadingState$.asObservable();

  public readonly displayGeolocation$: Observable<boolean> = this._displayGeolocation$.asObservable();

  public notFound$: Observable<boolean> = of(false);

  public resultsFound$: Observable<ResultFoundPresentation<{ type: AddressType }>[]> = this._searchTerm$.pipe(
    map((searchTerm: string): string => searchTerm.trim()),
    filter((searchTerm: string): boolean => searchTerm.length >= MIN_SEARCH_TERM_LENGTH),
    debounceTime(SEARCH_DEBOUNCE_TIME),
    distinctUntilChanged(),
    switchMap(
      (searchTerm: string): Observable<ResultFoundPresentation<{ type: AddressType }>[][]> =>
        forkJoin(this._searchables.map((searchable: Searchable<{ type: AddressType }>) => searchable.search$(searchTerm)))
    ),
    map((resultsToCombine: ResultFoundPresentation<{ type: AddressType }>[][]) => resultsToCombine.flat())
  );

  public initialSearch$: Observable<string> = this._initialSearch$.pipe(
    map((searchTerm: string): string => searchTerm.trim()),
    filter((searchTerm: string): boolean => searchTerm.length >= MIN_SEARCH_TERM_LENGTH),
    debounceTime(SEARCH_DEBOUNCE_TIME),
    distinctUntilChanged(),
    switchMap(
      (searchTerm: string): Observable<ResultFoundPresentation<{ type: AddressType }>[][]> =>
        forkJoin(this._searchables.map((searchable: Searchable<{ type: AddressType }>) => searchable.search$(searchTerm)))
    ),
    map((resultsToCombine: ResultFoundPresentation<{ type: AddressType }>[][]) => resultsToCombine.flat()),
    tap(
      (addressesFound: ResultFoundPresentation<{ type: AddressType }>[]) =>
        addressesFound[0] && this.onSelected(addressesFound[0])
    ),
    map((addressesFound: ResultFoundPresentation<{ type: AddressType }>[]) => addressesFound[0]?.label)
  );

  @Output() public resultFound: EventEmitter<ResultFoundPresentation<{ type: AddressType | 'user' }>> = new EventEmitter<
    ResultFoundPresentation<{ type: AddressType | 'user' }>
  >();

  public constructor(
    @Inject(ZOOM_LEVEL_TOKEN)
    private readonly _zoomLevel: ZoomLevelConfiguration,
    @Inject(SEARCHABLE_TOKEN)
    private readonly _searchables: Searchable<{ type: AddressType }>[],
    public readonly markersPresenter: MarkersPresenter,
    public readonly route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.adresse && this._initialSearch$.next(this.adresse);
  }

  public onSearch(searchTerm: string): void {
    this._searchTerm$.next(searchTerm);
  }

  public onSelected(selectedResult: ResultFoundPresentation<{ type: AddressType }>): void {
    this.markersPresenter.center(
      selectedResult.localisation,
      setZoomUserPosition(this._zoomLevel.userPosition, parseInt(this.route.snapshot.queryParams['distance']))
    );
    this.resultFound.emit(selectedResult);
    this._displayGeolocation$.next(true);
  }

  public onGeoLocate(): void {
    this._loadingState$.next(true);
    window.navigator.geolocation.getCurrentPosition((position: GeolocationPosition): void => {
      const localisation: Localisation = Localisation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });

      this.markersPresenter.center(
        localisation,
        setZoomUserPosition(this._zoomLevel.userPosition, parseInt(this.route.snapshot.queryParams['distance']))
      );
      this.resultFound.emit({ context: '', label: '', localisation, payload: { type: 'user' } });

      this._loadingState$.next(false);
      this._displayGeolocation$.next(false);
    });
  }
}

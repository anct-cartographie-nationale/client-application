import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { INITIAL_POSITION_TOKEN, ZOOM_LEVEL_TOKEN } from '@gouvfr-anct/mediation-numerique';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import {
  DepartementPresentation,
  FilterPresentation,
  LieuMediationNumeriquePresentation,
  LieuxMediationNumeriquePresenter,
  LieuxMediationNumeriqueRepository,
  Localisation,
  RegionPresentation,
  toFilterFormPresentationFromQuery,
  toLocalisationFromFilterFormPresentation
} from '../../../core';
import { MARKERS, MARKERS_TOKEN } from '../../configuration';
import { MarkersPresenter } from '../../presenters';
import { ViewReset } from '../../directives';
import { FeaturesConfiguration, FEATURES_TOKEN } from '../../../../root';
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cartographie.layout.html',
  providers: [
    {
      deps: [LieuxMediationNumeriqueRepository],
      provide: LieuxMediationNumeriquePresenter,
      useClass: LieuxMediationNumeriquePresenter
    },
    {
      provide: MARKERS_TOKEN,
      useValue: MARKERS
    },
    {
      deps: [ZOOM_LEVEL_TOKEN, INITIAL_POSITION_TOKEN],
      provide: MarkersPresenter,
      useClass: MarkersPresenter
    }
  ]
})
export class CartographieLayout {
  private _localisation: Localisation = toLocalisationFromFilterFormPresentation(
    toFilterFormPresentationFromQuery(this.route.snapshot.queryParams)
  );

  private _lieuxMediationNumeriqueListPresenterArgs: [
    Observable<Localisation>,
    Observable<FilterPresentation>,
    Date,
    Observable<[Localisation, Localisation]>
  ] = [
    of(this._localisation),
    this.route.queryParams.pipe(map(toFilterFormPresentationFromQuery)),
    new Date(),
    this.markersPresenter.boundingBox$
  ];

  public lieuxMediationNumerique$: Observable<LieuMediationNumeriquePresentation[]> = this._lieuxMediationNumeriqueListPresenter
    .lieuxMediationNumeriqueByDistance$(...this._lieuxMediationNumeriqueListPresenterArgs)
    .pipe(tap(() => this._loadingState$.next(false)));

  public departements$: Observable<DepartementPresentation[]> = this._lieuxMediationNumeriqueListPresenter
    .lieuxMediationNumeriqueByDepartement$(...this._lieuxMediationNumeriqueListPresenterArgs)
    .pipe(tap(() => this._loadingState$.next(false)));

  public regions$: Observable<RegionPresentation[]> = this._lieuxMediationNumeriqueListPresenter
    .lieuxMediationNumeriqueByRegion$(...this._lieuxMediationNumeriqueListPresenterArgs)
    .pipe(tap(() => this._loadingState$.next(false)));

  private _loadingState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public loadingState$: Observable<boolean> = this._loadingState$.asObservable();

  public fromOrientation: boolean = Object.keys(this.route.snapshot.queryParams).length > 0;

  public constructor(
    private readonly _router: Router,
    private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter,
    @Inject(FEATURES_TOKEN)
    public readonly features: FeaturesConfiguration,
    public readonly markersPresenter: MarkersPresenter,
    public readonly route: ActivatedRoute
  ) {}

  public onShowDetails(lieu: LieuMediationNumeriquePresentation): void {
    this._router.navigate([lieu.id, 'details'], { relativeTo: this.route.parent });
    this.markersPresenter.center(lieu.localisation);
    this.markersPresenter.select(lieu.id);
  }

  public onMapViewUpdated({ viewport: [leftLongitude, bottomLatitude, rightLongitude, topLatitude], zoomLevel }: ViewReset) {
    this.markersPresenter.zoomLevel(zoomLevel);
    this.markersPresenter.boundingBox([
      Localisation({ latitude: topLatitude, longitude: leftLongitude }),
      Localisation({ latitude: bottomLatitude, longitude: rightLongitude })
    ]);
  }

  public toQueryString(fromObject: {} = {}): string {
    return new HttpParams({ fromObject }).toString();
  }

  public resetFilters(): void {
    this._router.navigate([], {
      relativeTo: this.route.parent
    });
  }
}

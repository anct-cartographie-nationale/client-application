import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { INITIAL_POSITION_TOKEN, ZOOM_LEVEL_TOKEN } from '@gouvfr-anct/mediation-numerique';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { FeaturesConfiguration, FEATURES_TOKEN } from '../../../../root';
import {
  DepartementPresentation,
  FilterPresentation,
  LieuMediationNumeriquePresentation,
  LieuxMediationNumeriquePresenter,
  LieuxMediationNumeriqueRepository,
  Localisation,
  regionFromDepartement,
  RegionPresentation,
  toFilterFormPresentationFromQuery,
  toLocalisationFromFilterFormPresentation
} from '../../../core';
import { MARKERS, MARKERS_TOKEN } from '../../configuration';
import { MarkersPresenter } from '../../presenters';
import { ViewReset } from '../../directives';

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
  private _previousZoomLevel: number = 0;

  private _lieuxMediationNumeriqueListPresenterArgs: [
    Observable<Localisation>,
    Observable<FilterPresentation>,
    Date,
    Observable<[Localisation, Localisation]>
  ] = [
    of(toLocalisationFromFilterFormPresentation(toFilterFormPresentationFromQuery(this.route.snapshot.queryParams))),
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

  public regions$: Observable<RegionPresentation[]> = combineLatest([
    this._lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByRegion$(
      ...this._lieuxMediationNumeriqueListPresenterArgs
    ),
    this.markersPresenter.currentZoomLevel$
  ]).pipe(
    tap(([_, zoomLevel]: [RegionPresentation[], number]): void => {
      this._loadingState$.next(false);

      if (zoomLevel <= 7 && this._previousZoomLevel > 7) {
        this.router.navigate(['regions'], { relativeTo: this.route.parent });
      }
      this._previousZoomLevel = zoomLevel;
    }),
    map(([regions]: [RegionPresentation[], number]): RegionPresentation[] => regions)
  );

  private _loadingState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public loadingState$: Observable<boolean> = this._loadingState$.asObservable();

  public fromOrientation: boolean = Object.keys(this.route.snapshot.queryParams).length > 0;

  public constructor(
    private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter,
    public readonly router: Router,
    public readonly route: ActivatedRoute,
    @Inject(FEATURES_TOKEN)
    public readonly features: FeaturesConfiguration,
    public readonly markersPresenter: MarkersPresenter
  ) {}

  public onShowDetails(lieu: LieuMediationNumeriquePresentation): void {
    this.router.navigate([lieu.id, 'details'], { relativeTo: this.route.parent });
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

  public onShowLieuxInDepartement(departement: DepartementPresentation) {
    this.markersPresenter.center(departement.localisation, departement.zoom);
    this.router.navigate(['regions', regionFromDepartement(departement)?.nom, departement.nom], {
      relativeTo: this.route.parent
    });
  }

  public onShowLieuxInRegion(region: RegionPresentation) {
    this.markersPresenter.center(region.localisation, region.zoom);
    this.router.navigate(['regions', region.nom], { relativeTo: this.route.parent });
  }

  public toQueryString(fromObject: {} = {}): string {
    return new HttpParams({ fromObject }).toString();
  }

  public resetFilters(): void {
    this.router.navigate([], {
      relativeTo: this.route.parent
    });
  }
}

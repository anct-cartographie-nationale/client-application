import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  INITIAL_POSITION_TOKEN,
  InitialPositionConfiguration,
  ZOOM_LEVEL_TOKEN,
  ZoomLevelConfiguration
} from '@gouvfr-anct/mediation-numerique';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, Observable, of } from 'rxjs';
import { LieuxMediationNumeriqueListPresenter, LieuxMediationNumeriqueRepository, MarkersPresenter } from '../../../../domain';
import {
  FilterPresentation,
  toFilterFormPresentationFromQuery,
  toLocalisationFromFilterFormPresentation
} from '../../../../../orientation/domain/presenters/filter/filter.presenter';
import { Localisation } from '../../../../../../models';
import { CenterView } from '../../components/leaflet-map/leaflet-map.presenter';
import { MARKERS, MARKERS_TOKEN } from '../../configuration/marker';
import { LieuMediationNumeriqueListItemPresentation } from '../../../../domain/presenters/lieux-mediation-numerique-list/lieu-mediation-numerique-list-item.presentation';
import { MarkerEvent } from '../../directives';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cartographie.layout.html',
  providers: [
    {
      deps: [LieuxMediationNumeriqueRepository],
      provide: LieuxMediationNumeriqueListPresenter,
      useClass: LieuxMediationNumeriqueListPresenter
    },
    {
      provide: MARKERS_TOKEN,
      useValue: MARKERS
    },
    MarkersPresenter
  ]
})
export class CartographieLayout {
  private _filterPresentation: FilterPresentation = toFilterFormPresentationFromQuery(this._route.snapshot.queryParams);

  private _localisation: Localisation = toLocalisationFromFilterFormPresentation(this._filterPresentation);

  public lieuxMediationNumerique$: Observable<LieuMediationNumeriqueListItemPresentation[]> =
    this._lieuxMediationNumeriqueListPresenter
      .lieuxMediationNumeriqueByDistance$(of(this._localisation), of(this._filterPresentation))
      .pipe(delay(0));

  public readonly defaultCenterView: CenterView = {
    coordinates: Localisation({
      latitude: this._initialPosition.latitude,
      longitude: this._initialPosition.longitude
    }),
    zoomLevel: this._zoomLevel.regular
  };

  public constructor(
    private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter,
    public readonly markersPresenter: MarkersPresenter,
    private readonly _route: ActivatedRoute,
    private readonly router: Router,
    @Inject(ZOOM_LEVEL_TOKEN)
    private readonly _zoomLevel: ZoomLevelConfiguration,
    @Inject(INITIAL_POSITION_TOKEN)
    private readonly _initialPosition: InitialPositionConfiguration
  ) {}

  public showDetailStructure(lieuxMediationNumerique: MarkerEvent<LieuMediationNumeriqueListItemPresentation>): void {
    this.router.navigate(['cartographie', lieuxMediationNumerique.markerProperties.id]);
    this.markersPresenter.focus(lieuxMediationNumerique.markerProperties.localisation, this._zoomLevel.userPosition);
  }
}

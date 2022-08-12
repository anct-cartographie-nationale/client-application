import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, Observable, of, tap } from 'rxjs';
import { ZOOM_LEVEL_TOKEN, ZoomLevelConfiguration } from '@gouvfr-anct/mediation-numerique';
import {
  FilterPresentation,
  LieuxMediationNumeriqueRepository,
  Localisation,
  toFilterFormPresentationFromQuery,
  toLocalisationFromFilterFormPresentation
} from '../../../core';
import {
  LieuxMediationNumeriqueDetailsPresenter,
  LieuMediationNumeriqueDetailsPresentation,
  MarkersPresenter
} from '../../presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'lieux-mediation-numerique-details.page.html',
  providers: [
    {
      deps: [LieuxMediationNumeriqueRepository],
      provide: LieuxMediationNumeriqueDetailsPresenter,
      useClass: LieuxMediationNumeriqueDetailsPresenter
    }
  ]
})
export class LieuxMediationNumeriqueDetailsPage {
  private _filterPresentation: FilterPresentation = toFilterFormPresentationFromQuery(this._route.snapshot.queryParams);

  private _localisation: Localisation = toLocalisationFromFilterFormPresentation(this._filterPresentation);

  public lieuMediationNumerique$: Observable<LieuMediationNumeriqueDetailsPresentation> =
    this.lieuxMediationNumeriqueDetailsPresenter
      .lieuMediationNumeriqueFromParams$(this._route.params, new Date(), of(this._localisation))
      .pipe(
        delay(300),
        tap((lieuMediationNumerique: LieuMediationNumeriqueDetailsPresentation) => this.select(lieuMediationNumerique))
      );

  public constructor(
    @Inject(ZOOM_LEVEL_TOKEN)
    private readonly _zoomLevel: ZoomLevelConfiguration,
    private readonly lieuxMediationNumeriqueDetailsPresenter: LieuxMediationNumeriqueDetailsPresenter,
    private readonly _route: ActivatedRoute,
    private readonly _markersPresenter: MarkersPresenter
  ) {}

  public printPage() {
    window.print();
  }

  private select(lieuMediationNumerique: LieuMediationNumeriqueDetailsPresentation) {
    lieuMediationNumerique.localisation &&
      this._markersPresenter.focus(lieuMediationNumerique.localisation, this._zoomLevel.userPosition);
    this._markersPresenter.select(lieuMediationNumerique.id);
  }
}

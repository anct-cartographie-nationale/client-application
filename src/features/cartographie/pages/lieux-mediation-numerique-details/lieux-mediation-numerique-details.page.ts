import { Observable, of, shareReplay, tap } from 'rxjs';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZOOM_LEVEL_TOKEN, ZoomLevelConfiguration } from '@gouvfr-anct/mediation-numerique';
import { BRAND_TOKEN, BrandConfiguration } from '../../../../root';
import { toFilterFormPresentationFromQuery, toLocalisationFromFilterFormPresentation } from '../../../core';
import {
  LieuMediationNumeriqueDetailsPresentation,
  LieuxMediationNumeriqueDetailsPresenter,
  MarkersPresenter
} from '../../presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'lieux-mediation-numerique-details.page.html'
})
export class LieuxMediationNumeriqueDetailsPage {
  public lieuMediationNumerique$: Observable<LieuMediationNumeriqueDetailsPresentation> =
    this._lieuxMediationNumeriqueDetailsPresenter
      .lieuMediationNumeriqueFromParams$(
        this._route.paramMap,
        new Date(),
        of(toLocalisationFromFilterFormPresentation(toFilterFormPresentationFromQuery(this._route.snapshot.queryParams)))
      )
      .pipe(
        tap((lieuMediationNumerique: LieuMediationNumeriqueDetailsPresentation) => this.select(lieuMediationNumerique)),
        shareReplay()
      );

  public constructor(
    @Inject(ZOOM_LEVEL_TOKEN)
    private readonly _zoomLevel: ZoomLevelConfiguration,
    @Inject(BRAND_TOKEN) public readonly brandConfiguration: BrandConfiguration,
    private readonly _lieuxMediationNumeriqueDetailsPresenter: LieuxMediationNumeriqueDetailsPresenter,
    private readonly _markersPresenter: MarkersPresenter,
    private readonly _route: ActivatedRoute
  ) {}

  private select(lieuMediationNumerique: LieuMediationNumeriqueDetailsPresentation) {
    lieuMediationNumerique.localisation &&
      this._markersPresenter.center(lieuMediationNumerique.localisation, this._zoomLevel.userPosition);
    this._markersPresenter.select(lieuMediationNumerique.id);
  }
}

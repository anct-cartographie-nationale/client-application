import { Observable, of, Subject, tap } from 'rxjs';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZOOM_LEVEL_TOKEN, ZoomLevelConfiguration } from '@gouvfr-anct/mediation-numerique';
import { BRAND_TOKEN, BrandConfiguration } from '../../../../root';
import { FilterPresentation, toFilterFormPresentationFromQuery, toLocalisationFromFilterFormPresentation } from '../../../core';
import {
  LieuMediationNumeriqueDetailsPresentation,
  LieuxMediationNumeriqueDetailsPresenter,
  MarkersPresenter
} from '../../presenters';
import { OrientationSheetForm } from '../../forms';
import { map } from 'rxjs/operators';

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
      .pipe(tap((lieuMediationNumerique: LieuMediationNumeriqueDetailsPresentation) => this.select(lieuMediationNumerique)));

  private readonly _orientationSheetForm$: Subject<OrientationSheetForm | undefined> = new Subject<
    OrientationSheetForm | undefined
  >();
  public orientationSheetForm$: Observable<OrientationSheetForm | undefined> = this._orientationSheetForm$.asObservable();

  public filters$: Observable<FilterPresentation> = this._route.queryParams.pipe(map(toFilterFormPresentationFromQuery));

  public constructor(
    @Inject(ZOOM_LEVEL_TOKEN)
    private readonly _zoomLevel: ZoomLevelConfiguration,
    @Inject(BRAND_TOKEN) public readonly brandConfiguration: BrandConfiguration,
    private readonly _lieuxMediationNumeriqueDetailsPresenter: LieuxMediationNumeriqueDetailsPresenter,
    private readonly _markersPresenter: MarkersPresenter,
    private readonly _route: ActivatedRoute
  ) {}

  public printDetails(orientationSheetValues?: OrientationSheetForm) {
    this._orientationSheetForm$.next(orientationSheetValues);
    setTimeout(() => {
      window.print();
      this._orientationSheetForm$.next(void 0);
    });
  }

  private select(lieuMediationNumerique: LieuMediationNumeriqueDetailsPresentation) {
    lieuMediationNumerique.localisation &&
      this._markersPresenter.center(lieuMediationNumerique.localisation, this._zoomLevel.userPosition);
    this._markersPresenter.select(lieuMediationNumerique.id);
  }
}

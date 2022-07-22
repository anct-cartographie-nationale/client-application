import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ZOOM_LEVEL_TOKEN, ZoomLevelConfiguration } from '@gouvfr-anct/mediation-numerique';
import { LieuxMediationNumeriqueListPresenter, LieuxMediationNumeriqueRepository, MarkersPresenter } from '../../../../domain';
import { LieuMediationNumeriqueListItemPresentation } from '@features/cartographie/domain/presenters/lieux-mediation-numerique-list/lieu-mediation-numerique-list-item.presentation';
import {
  FilterPresentation,
  toFilterFormPresentationFromQuery,
  toLocalisationFromFilterFormPresentation
} from '../../../../../orientation/domain/presenters/filter/filter.presenter';
import { LieuMediationNumerique, Localisation } from '../../../../../../models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      deps: [LieuxMediationNumeriqueRepository],
      provide: LieuxMediationNumeriqueListPresenter,
      useClass: LieuxMediationNumeriqueListPresenter
    }
  ],
  templateUrl: 'lieux-mediation-numerique-list.page.html'
})
export class LieuxMediationNumeriqueListPage {
  private _filterPresentation: FilterPresentation = toFilterFormPresentationFromQuery(this._route.snapshot.queryParams);

  private _localisation: Localisation = toLocalisationFromFilterFormPresentation(this._filterPresentation);

  public lieuxMediationNumerique$: Observable<LieuMediationNumeriqueListItemPresentation[]> =
    this._lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueByDistance$(
      of(this._localisation),
      of(this._filterPresentation)
    );

  public constructor(
    private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriqueListPresenter,
    private readonly _route: ActivatedRoute,
    @Inject(ZOOM_LEVEL_TOKEN)
    private readonly _zoomLevel: ZoomLevelConfiguration,
    public readonly markersPresenter: MarkersPresenter
  ) {}

  public select(lieuMediationNumerique: LieuMediationNumerique) {
    this.markersPresenter.focus(lieuMediationNumerique.localisation, this._zoomLevel.userPosition);
  }

  public printPage() {
    window.print();
  }
}

import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ZOOM_LEVEL_TOKEN, ZoomLevelConfiguration } from '@gouvfr-anct/mediation-numerique';
import { MarkersPresenter } from '../../../../domain';
import { LieuMediationNumerique } from '../../../../../../models';
import { CartographieLayout } from '../../layouts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'lieux-mediation-numerique-list.page.html'
})
export class LieuxMediationNumeriqueListPage {
  public constructor(
    @Inject(ZOOM_LEVEL_TOKEN)
    private readonly _zoomLevel: ZoomLevelConfiguration,
    public readonly markersPresenter: MarkersPresenter,
    public readonly cartographieLayout: CartographieLayout
  ) {}

  public select(lieuMediationNumerique: LieuMediationNumerique) {
    this.markersPresenter.focus(lieuMediationNumerique.localisation, this._zoomLevel.userPosition);
  }

  public printPage() {
    window.print();
  }
}

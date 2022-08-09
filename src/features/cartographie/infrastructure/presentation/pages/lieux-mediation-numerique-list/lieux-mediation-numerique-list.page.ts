import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ZOOM_LEVEL_TOKEN, ZoomLevelConfiguration } from '@gouvfr-anct/mediation-numerique';
import { MarkersPresenter } from '../../../../domain';
import { LieuMediationNumerique } from '../../../../../../models';
import { CartographieLayout } from '../../layouts';
import { LieuMediationNumeriqueListItemPresentation } from '../../../../domain/presenters/lieux-mediation-numerique-list/lieu-mediation-numerique-list-item.presentation';

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

  public trackByLieuId(_: number, lieu: LieuMediationNumeriqueListItemPresentation) {
    return lieu.id;
  }

  public select(lieuMediationNumerique: LieuMediationNumerique) {
    this.markersPresenter.focus(lieuMediationNumerique.localisation, this._zoomLevel.userPosition);
    this.markersPresenter.select(lieuMediationNumerique.id);
  }

  public printPage() {
    window.print();
  }
}

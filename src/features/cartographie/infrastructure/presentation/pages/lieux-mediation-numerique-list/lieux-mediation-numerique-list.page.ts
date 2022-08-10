import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ZOOM_LEVEL_TOKEN, ZoomLevelConfiguration } from '@gouvfr-anct/mediation-numerique';
import { MarkersPresenter } from '../../../../domain';
import { LieuMediationNumerique } from '../../../../../../models';
import { CartographieLayout } from '../../layouts';
import { LieuMediationNumeriqueListItemPresentation } from '../../../../domain/presenters/lieux-mediation-numerique-list/lieu-mediation-numerique-list-item.presentation';
import { combineLatest, Observable, tap } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';

const toLieuxWithLieuToFocus = ([lieux, paramMap]: [LieuMediationNumeriqueListItemPresentation[], ParamMap]): [
  LieuMediationNumeriqueListItemPresentation[],
  LieuMediationNumeriqueListItemPresentation?
] => [lieux, lieux.find((lieu: LieuMediationNumeriqueListItemPresentation) => lieu.id === paramMap.get('id'))];

const toLieux = ([lieux]: [
  LieuMediationNumeriqueListItemPresentation[],
  LieuMediationNumeriqueListItemPresentation?
]): LieuMediationNumeriqueListItemPresentation[] => {
  return lieux;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'lieux-mediation-numerique-list.page.html'
})
export class LieuxMediationNumeriqueListPage {
  private _initialZoom: boolean = false;

  private setInitialState = ([_, lieu]: [
    LieuMediationNumeriqueListItemPresentation[],
    LieuMediationNumeriqueListItemPresentation?
  ]): void => {
    this.markersPresenter.select('');
    lieu && !this._initialZoom && this.focusOnLieu(lieu);
    this._initialZoom = true;
  };

  public lieuxMediationNumerique$: Observable<LieuMediationNumeriqueListItemPresentation[]> = combineLatest([
    this._cartographieLayout.lieuxMediationNumerique$,
    this._route.paramMap
  ]).pipe(map(toLieuxWithLieuToFocus), tap(this.setInitialState), map(toLieux));

  public constructor(
    @Inject(ZOOM_LEVEL_TOKEN)
    private readonly _zoomLevel: ZoomLevelConfiguration,
    private readonly _cartographieLayout: CartographieLayout,
    private readonly _route: ActivatedRoute,
    public readonly markersPresenter: MarkersPresenter
  ) {}

  private focusOnLieu(lieu: LieuMediationNumeriqueListItemPresentation) {
    this.markersPresenter.focus(lieu.localisation, this._zoomLevel.userPosition);

    setTimeout((): void => {
      document.getElementById(lieu.id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    });
  }

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

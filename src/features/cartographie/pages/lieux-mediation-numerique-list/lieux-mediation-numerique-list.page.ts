import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ZOOM_LEVEL_TOKEN, ZoomLevelConfiguration } from '@gouvfr-anct/mediation-numerique';
import { combineLatest, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { FEATURES_TOKEN, FeaturesConfiguration } from '../../../../root';
import { LieuMediationNumerique, LieuMediationNumeriquePresentation } from '../../../core';
import { MarkersPresenter } from '../../presenters';
import { CartographieLayout } from '../../layouts';

const toLieuxWithLieuToFocus = ([lieux, paramMap]: [LieuMediationNumeriquePresentation[], ParamMap]): [
  LieuMediationNumeriquePresentation[],
  LieuMediationNumeriquePresentation?
] => [lieux, lieux.find((lieu: LieuMediationNumeriquePresentation) => lieu.id === paramMap.get('id'))];

const toLieux = ([lieux]: [
  LieuMediationNumeriquePresentation[],
  LieuMediationNumeriquePresentation?
]): LieuMediationNumeriquePresentation[] => {
  return lieux;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'lieux-mediation-numerique-list.page.html'
})
export class LieuxMediationNumeriqueListPage {
  private _initialZoom: boolean = false;

  private setInitialState = ([_, lieu]: [LieuMediationNumeriquePresentation[], LieuMediationNumeriquePresentation?]): void => {
    this.markersPresenter.select('');
    lieu && !this._initialZoom && this.focusOnLieu(lieu);
    this._initialZoom = true;
  };

  public lieuxMediationNumerique$: Observable<LieuMediationNumeriquePresentation[]> = combineLatest([
    this._cartographieLayout.lieuxMediationNumerique$,
    this.route.paramMap
  ]).pipe(map(toLieuxWithLieuToFocus), tap(this.setInitialState), map(toLieux));

  public constructor(
    @Inject(FEATURES_TOKEN)
    public readonly features: FeaturesConfiguration,
    @Inject(ZOOM_LEVEL_TOKEN)
    private readonly _zoomLevel: ZoomLevelConfiguration,
    private readonly _cartographieLayout: CartographieLayout,
    public readonly route: ActivatedRoute,
    public readonly markersPresenter: MarkersPresenter
  ) {}

  private focusOnLieu(lieu: LieuMediationNumeriquePresentation) {
    this.markersPresenter.focus(lieu.localisation, this._zoomLevel.regular);
    this._cartographieLayout.resetZoom();

    setTimeout((): void => {
      document.getElementById(lieu.id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }, 400);
  }

  public trackByLieuId(_: number, lieu: LieuMediationNumeriquePresentation) {
    return lieu.id;
  }

  public select(lieuMediationNumerique: LieuMediationNumerique) {
    this.markersPresenter.focus(lieuMediationNumerique.localisation, this._zoomLevel.userPosition);
    this.markersPresenter.select(lieuMediationNumerique.id);
  }

  public printPage() {
    window.print();
  }

  public toQueryString(fromObject: {} = {}): string {
    return new HttpParams({ fromObject }).toString();
  }
}

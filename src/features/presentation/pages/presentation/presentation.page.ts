import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { LieuMediationNumerique } from '@gouvfr-anct/lieux-de-mediation-numerique';
import { environment } from '../../../../environments/environment';
import { LieuxMediationNumeriquePresenter, onlyWithLocalisation } from '../../../core/presenters';
import { LieuxMediationNumeriqueRepository } from '../../../core/repositories';

const toLieuxWithLocalisation = (lieux: LieuMediationNumerique[]) => lieux.filter(onlyWithLocalisation);

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './presentation.page.html',
  providers: [
    {
      deps: [LieuxMediationNumeriqueRepository],
      provide: LieuxMediationNumeriquePresenter,
      useClass: LieuxMediationNumeriquePresenter
    }
  ],
  styleUrls: ['./presentation.page.scss']
})
export class PresentationLayout {
  private _currentSlide$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public currentSlide$: Observable<number> = this._currentSlide$.asObservable();
  public environment: Boolean = environment.production;
  public lieuxMediationNumeriqueTotal$: Observable<LieuMediationNumerique[]> =
    this._lieuxMediationNumeriqueListPresenter.lieuxMediationNumerique$.pipe(map(toLieuxWithLocalisation));

  public constructor(private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter) {}

  // carousel navigator
  onSwitchSlide = (value: number): void => {
    this._currentSlide$.next(value);
  };

  onPreviousSlide = (): void => {
    this._currentSlide$.next(this._currentSlide$.value - 1 < 0 ? 3 : this._currentSlide$.value - 1);
  };

  onNextSlide = (): void => {
    this._currentSlide$.next(this._currentSlide$.value + 1 > 3 ? 0 : this._currentSlide$.value + 1);
  };

  public slidesBackground: string[] = ['bg-orientation', 'bg-visibilite', 'bg-centralisation', 'bg-actualisation'];
}

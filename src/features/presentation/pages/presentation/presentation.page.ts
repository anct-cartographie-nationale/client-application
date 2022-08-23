import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import {
  LieuMediationNumeriquePresentation,
  LieuxMediationNumeriquePresenter,
  LieuxMediationNumeriqueRepository
} from '../../../core';

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
  public currentSlide: number = 0;
  public environment: Boolean = environment.production;
  public lieuxMediationNumeriqueTotal$: Observable<LieuMediationNumeriquePresentation[]> =
    this._lieuxMediationNumeriqueListPresenter.lieuxMediationNumeriqueTotal$();

  public constructor(private readonly _lieuxMediationNumeriqueListPresenter: LieuxMediationNumeriquePresenter) {}

  // carousel navigator
  switchSlide = (value: number): void => {
    this.currentSlide = value;
  };

  onPreviousClick = (): void => {
    this.currentSlide = this.currentSlide - 1 < 0 ? 3 : this.currentSlide - 1;
  };

  onNextClick = (): void => {
    this.currentSlide = this.currentSlide + 1 > 3 ? 0 : this.currentSlide + 1;
  };

  setBackgroundForEachSlides = (): string => {
    let activeClass = '';
    switch (this.currentSlide) {
      case 0:
        return (activeClass = 'bg-orientation');
      case 1:
        return (activeClass = 'bg-visibilite');
      case 2:
        return (activeClass = 'bg-centralisation');
      case 3:
        return (activeClass = 'bg-actualisation');
      default:
        return (activeClass = 'bg-orientation');
    }
  };
}

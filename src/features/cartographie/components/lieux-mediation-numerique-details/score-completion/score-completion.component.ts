import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { scoreCompletion } from './score-completion.presenter';
import { LieuMediationNumeriqueDetailsPresentation } from '@features/cartographie/presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-score-completion',
  templateUrl: './score-completion.component.html'
})
export class ScoreCompletionComponent {
  @Input() public lieuMediationNumerique!: LieuMediationNumeriqueDetailsPresentation;

  public scoreCompletion = scoreCompletion;
}

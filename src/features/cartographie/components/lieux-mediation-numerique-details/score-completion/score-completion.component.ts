import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { scoreCompletionPresence, scoreCompletion } from './score-completion.presenter';
import { LieuMediationNumeriqueDetailsPresentation } from '@features/cartographie/presenters';
import { ScorePresence } from './score-completion.presentation';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-score-completion',
  templateUrl: './score-completion.component.html'
})
export class ScoreCompletionComponent {
  @Input() public lieuMediationNumerique!: LieuMediationNumeriqueDetailsPresentation;

  public scoreCompletion = scoreCompletion;
  public scoreCompletionPresence = scoreCompletionPresence;

  public sortScoreCompletionPresence(scorePresence: ScorePresence[]): ScorePresence[] {
    return scorePresence.sort((a, b) => Number(b.presence) - Number(a.presence));
  }
}

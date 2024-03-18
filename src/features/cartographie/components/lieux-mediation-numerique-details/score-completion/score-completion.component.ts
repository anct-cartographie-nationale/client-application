import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { scoreCompletionPresence, scoreCompletionRate } from './score-completion.presenter';
import { LieuMediationNumeriqueDetailsPresentation } from '@features/cartographie/presenters';
import { ScorePresenceField } from './score-completion.presentation';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-score-completion',
  templateUrl: './score-completion.component.html'
})
export class ScoreCompletionComponent {
  @Input() public lieuMediationNumerique!: LieuMediationNumeriqueDetailsPresentation;

  public scoreCompletion = scoreCompletionRate;
  public scoreCompletionPresence = scoreCompletionPresence;

  public sortScoreCompletionPresence(scorePresence: ScorePresenceField[]): ScorePresenceField[] {
    return scorePresence.sort((a, b) => Number(a.presence) - Number(b.presence));
  }
}

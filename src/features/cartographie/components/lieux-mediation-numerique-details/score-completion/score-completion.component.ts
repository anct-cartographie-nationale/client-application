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

  public scoreExplanation(score: number): string {
    switch (true) {
      case score >= 0 && score < 60:
        return "Vous travaillez ici ? Nous vous conseillons d'enrichir les informations que nous possédont pour améliorer la visibilité de votre lieu";
      case score >= 60 && score < 85:
        return "C'est déjà bien ! Si vous travaillez ici, vous pouvez enrichir les informations que nous possédons";
      case score >= 85:
        return "Cette structure semble à jour avec la bonne quantité d'informations renseignée !";
      default:
        return '';
    }
  }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PriseEnChargeSpecifique, PublicSpecifiquementAdresse } from '@gouvfr-anct/lieux-de-mediation-numerique';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-prise-en-charge-specifique',
  templateUrl: './prise-en-charge-specifique.component.html'
})
export class PriseEnChargeSpecifiqueComponent {
  @Input() public prisesEnChargeSpecifiques: PriseEnChargeSpecifique[] | undefined;
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PublicSpecifiquementAdresse } from '@gouvfr-anct/lieux-de-mediation-numerique';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-publics-specifiquement-adresses',
  templateUrl: './publics-specifiquement-adresses.component.html'
})
export class PublicsSpecifiquementAdressesComponent {
  @Input() public publicsSpecifiquementAdresses: PublicSpecifiquementAdresse[] | undefined;
}

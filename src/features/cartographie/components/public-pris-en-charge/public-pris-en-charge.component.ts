import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PublicAccueilli } from '../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-public-pris-en-charge',
  templateUrl: './public-pris-en-charge.component.html'
})
export class PublicPrisEnChargeComponent {
  @Input() public publicsAccueillis?: PublicAccueilli[];
}

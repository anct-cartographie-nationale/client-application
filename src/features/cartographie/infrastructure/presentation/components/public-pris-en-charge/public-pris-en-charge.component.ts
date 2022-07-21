import { Component, Input } from '@angular/core';
import { PublicAccueilli } from 'projects/client-application/src/models';

@Component({
  selector: 'app-public-pris-en-charge',
  templateUrl: './public-pris-en-charge.component.html'
})
export class PublicPrisEnChargeComponent {
  @Input() public publicsAccueillis?: PublicAccueilli[];
}

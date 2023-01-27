import { Component, Input } from '@angular/core';
import { PublicAccueilli } from '@gouvfr-anct/lieux-de-mediation-numerique';

@Component({
  selector: 'app-public-pris-en-charge',
  template: ''
})
export class PublicPrisEnChargeStubComponent {
  @Input() public publicsAccueillis?: PublicAccueilli[];
}

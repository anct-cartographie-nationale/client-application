import { Component, Input } from '@angular/core';
import { PublicSpecifiquementAdresse } from '@gouvfr-anct/lieux-de-mediation-numerique';

@Component({
  selector: 'app-public-specifiquement-adresse',
  template: ''
})
export class PublicSpecifiquementAdresseStubComponent {
  @Input() public publicSpecifiquementAdresse?: PublicSpecifiquementAdresse[];
}

import { Component, Input } from '@angular/core';
import { Url } from '@gouvfr-anct/lieux-de-mediation-numerique';

@Component({
  selector: 'app-informations-pratiques',
  template: ''
})
export class InformationsPratiquesStubComponent {
  @Input() public adresse!: string;
  @Input() public conditionsAcces?: string;
  @Input() public accessibilite?: Url;
  @Input() public courriel?: string;
  @Input() public telephone?: string;
  @Input() public distance?: number;
}

import { Component, Input } from '@angular/core';
import { Service } from '@gouvfr-anct/lieux-de-mediation-numerique';

@Component({
  selector: 'app-services',
  template: ''
})
export class ServicesStubComponent {
  @Input() public services?: Service[];
}

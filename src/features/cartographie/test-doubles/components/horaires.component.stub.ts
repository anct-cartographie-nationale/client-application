import { Component, Input } from '@angular/core';
import { HorairesPresentation } from '../../../core';

@Component({
  selector: 'app-horaires',
  template: ''
})
export class HorairesStubComponent {
  @Input() public horaires?: HorairesPresentation;
}

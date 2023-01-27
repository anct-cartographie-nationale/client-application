import { Component, Input } from '@angular/core';
import { Aidant } from '../../../core';

@Component({
  selector: 'app-aidants',
  template: ''
})
export class AidantsStubComponent {
  @Input() public aidants: Aidant[] = [];
}

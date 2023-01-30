import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-description',
  template: ''
})
export class DescriptionStubComponent {
  @Input() public resumee?: string;
  @Input() public detail?: string;
}

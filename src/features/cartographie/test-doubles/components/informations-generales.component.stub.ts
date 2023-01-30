import { Component, Input } from '@angular/core';
import { OpeningStatus } from '../../../core';

@Component({
  selector: 'app-informations-generales',
  template: ''
})
export class InformationsGeneralesStubComponent {
  @Input() public id: string = '';
  @Input() public nom: string = '';
  @Input() public typologie?: string;
  @Input() public date?: Date;
  @Input() public status?: OpeningStatus;
  @Input() public source?: string = '';
}

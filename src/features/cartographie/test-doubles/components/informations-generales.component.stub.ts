import { Component, Input } from '@angular/core';
import { OpeningState } from '../../../core/presenters';

@Component({
  selector: 'app-informations-generales',
  template: ''
})
export class InformationsGeneralesStubComponent {
  @Input() public id: string = '';
  @Input() public nom: string = '';
  @Input() public typologie?: string;
  @Input() public date?: Date;
  @Input() public status?: OpeningState;
  @Input() public source?: string = '';
}

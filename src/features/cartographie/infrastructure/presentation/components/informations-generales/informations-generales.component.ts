import { Component, Input } from '@angular/core';
import { OpeningStatus } from '../../../../domain/presenters/horaires/horaires.presenter';

@Component({
  selector: 'app-informations-generales',
  templateUrl: './informations-generales.component.html'
})
export class InformationsGeneralesComponent {
  @Input() public nom: string = '';
  @Input() public typologie?: string;
  @Input() public date?: Date;
  @Input() public status?: OpeningStatus;
}

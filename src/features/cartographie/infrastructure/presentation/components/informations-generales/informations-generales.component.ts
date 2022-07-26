import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-informations-generales',
  templateUrl: './informations-generales.component.html'
})
export class InformationsGeneralesComponent {
  @Input() public nom: string = '';
  @Input() public typologie?: string;
  @Input() public date?: Date;
}

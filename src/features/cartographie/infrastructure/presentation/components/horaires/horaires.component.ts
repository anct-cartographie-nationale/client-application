import { Component, Input } from '@angular/core';
import { HorairesPresentation } from '@features/cartographie/domain/presenters/horaires/horaires.presentation';

@Component({
  selector: 'app-horaires',
  templateUrl: './horaires.component.html'
})
export class HorairesComponent {
  @Input() public horaires?: HorairesPresentation;
}

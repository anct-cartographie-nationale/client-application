import { Component, Input } from '@angular/core';
import { ModaliteAccompagnementPresentation } from '../../presenters';

@Component({
  selector: 'app-modalites-accompagnement',
  template: ''
})
export class ModalitesAccompagnementStubComponent {
  @Input() public modalitesAccompagnement?: ModaliteAccompagnementPresentation[];
}

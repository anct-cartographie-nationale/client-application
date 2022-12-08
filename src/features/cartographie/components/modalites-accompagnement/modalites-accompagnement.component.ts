import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModaliteAccompagnementPresentation } from '../../presenters';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-modalites-accompagnement',
  templateUrl: './modalites-accompagnement.component.html'
})
export class ModalitesAccompagnementComponent {
  @Input() public modalitesAccompagnement?: ModaliteAccompagnementPresentation[];
}

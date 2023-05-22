import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Aidant } from '../../../../core/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-aidants',
  templateUrl: './aidants.component.html'
})
export class AidantsComponent {
  @Input() public aidants: Aidant[] = [];
}

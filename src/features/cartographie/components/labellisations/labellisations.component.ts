import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LabelNational } from '../../../core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-labellisations',
  templateUrl: './labellisations.component.html'
})
export class LabellisationsComponent {
  @Input() public labelsNationaux?: LabelNational[];
  @Input() public labelsAutres?: string[];
}

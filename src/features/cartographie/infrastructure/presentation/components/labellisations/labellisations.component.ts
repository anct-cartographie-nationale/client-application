import { Component, Input } from '@angular/core';
import { LabelNational } from 'projects/client-application/src/models';

@Component({
  selector: 'app-labellisations',
  templateUrl: './labellisations.component.html'
})
export class LabellisationsComponent {
  @Input() public labelsNationaux?: LabelNational[];
  @Input() public labelsAutres?: string[];
}

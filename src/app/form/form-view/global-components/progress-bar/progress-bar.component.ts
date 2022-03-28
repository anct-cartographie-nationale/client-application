import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { formType } from '../../formType.enum';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnChanges {
  @Input() formType: formType;
  @Input() isEditMode: boolean;
  @Input() currentPage: number;
  @Input() nbSteps: number;
  public progressStatus: number;
  public formTypeEnum = formType;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentPage) this.progressStatus = ((this.currentPage + 1) / this.nbSteps) * 100;
  }
}

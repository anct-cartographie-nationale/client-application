import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AvailableErreur } from '@features/cartographie/models';
import { ModalComponent } from '@features/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-erreur-form-modal',
  templateUrl: './erreur-form-modal.component.html'
})
export class ErreurFormModalComponent {
  @ViewChild(ModalComponent) control!: ModalComponent;

  @Input() public erreursReportFormGroup!: FormGroup;

  @Output() public reportAnError: EventEmitter<void> = new EventEmitter<void>();

  public availableErreurs: AvailableErreur[] = Object.values(AvailableErreur);
}

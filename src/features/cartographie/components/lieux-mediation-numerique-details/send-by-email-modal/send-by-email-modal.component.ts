import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from '../../../../core/components';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-send-by-email-modal',
  templateUrl: './send-by-email-modal.component.html'
})
export class SendByEmailModalComponent {
  @ViewChild(ModalComponent) control!: ModalComponent;

  public sendByEmailForm: FormGroup<{ email: AbstractControl }> = new FormGroup<{ email: AbstractControl }>({
    email: new FormControl<string>('', [Validators.required, Validators.email])
  });

  @Output() public sendEmailTo: EventEmitter<string> = new EventEmitter<string>();

  public onSubmitSendByEmailForm(): void {
    if (this.sendByEmailForm.invalid) {
      this.sendByEmailForm.markAllAsTouched();
      return;
    }

    this.sendEmailTo.emit(this.sendByEmailForm.controls.email.value);
    this.sendByEmailForm.reset();
  }

  public onClose(): void {
    this.sendByEmailForm.reset();
  }
}

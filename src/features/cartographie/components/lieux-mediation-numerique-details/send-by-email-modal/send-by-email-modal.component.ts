import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-send-by-email-modal',
  templateUrl: './send-by-email-modal.component.html'
})
export class SendByEmailModalComponent {
  private _isShown: boolean = false;

  private _activateModal$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._isShown);
  public activateModal$: Observable<boolean> = this._activateModal$.asObservable();

  private _animate$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._isShown);
  public animate$: Observable<boolean> = this._animate$;

  public sendByEmailForm = new FormGroup<{ email: AbstractControl }>({
    email: new FormControl<string>('', [Validators.required, Validators.email])
  });

  @Output() public sendEmailTo: EventEmitter<string> = new EventEmitter<string>();

  private show() {
    this._activateModal$.next(true);
    setTimeout(() => this._animate$.next(true), 100);
  }

  private hide() {
    this._animate$.next(false);
    setTimeout(() => this._activateModal$.next(false), 300);
  }

  public toggle() {
    this._isShown ? this.hide() : this.show();
    this._isShown = !this._isShown;
  }

  public onSubmitSendByEmailForm() {
    if (this.sendByEmailForm.invalid) {
      this.sendByEmailForm.markAllAsTouched();
      return;
    }

    this.sendEmailTo.emit(this.sendByEmailForm.controls.email.value);
    this.close();
  }

  public close(): void {
    this.toggle();
    this.sendByEmailForm.reset();
  }
}

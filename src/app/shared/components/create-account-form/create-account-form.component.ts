import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../validator/form';

@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss'],
})
export class CreateAccountFormComponent implements OnInit {
  constructor() {}
  public accountForm: FormGroup;
  public submitted: boolean = false;
  @Output() public submitForm = new EventEmitter<FormGroup>();

  ngOnInit(): void {
    this.accountForm = new FormGroup(
      {
        email: new FormControl('', Validators.required),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/), //NOSONAR
        ]),
        confirmPassword: new FormControl(''),
      },
      [MustMatch('password', 'confirmPassword')]
    );
  }

  public onSubmit(accountForm: FormGroup) {
    this.submitted = true;
    if (accountForm.valid) {
      this.submitForm.emit(accountForm);
    }
  }

  public getAccountControl(nameControl: string): AbstractControl {
    return this.accountForm.get(nameControl);
  }
}

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
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        phone: new FormControl('', [Validators.required, Validators.pattern('([0-9]{2} ){4}[0-9]{2}')]), //NOSONAR
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

  public modifyPhoneInput(phoneNumber: string): void {
    // Take length of phone number without spaces.
    let phoneNoSpace = phoneNumber.replace(/\s/g, '');
    // Check to refresh every 2 number.
    if (phoneNoSpace.length % 2 == 0) {
      // Add space every 2 number
      this.accountForm.get('phone').setValue(phoneNoSpace.replace(/(?!^)(?=(?:\d{2})+$)/g, ' ')); //NOSONAR
    }
  }
}

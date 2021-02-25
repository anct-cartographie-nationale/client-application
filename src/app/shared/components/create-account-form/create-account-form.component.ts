import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomRegExp } from '../../../utils/CustomRegExp';
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
  public isShowConfirmPassword = false;
  public isShowPassword = false;
  @Output() public submitForm = new EventEmitter<FormGroup>();

  ngOnInit(): void {
    this.accountForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.pattern(CustomRegExp.EMAIL)]),
        name: new FormControl('', [Validators.required, Validators.pattern(CustomRegExp.TEXT_WITHOUT_NUMBER)]),
        surname: new FormControl('', [Validators.required, Validators.pattern(CustomRegExp.TEXT_WITHOUT_NUMBER)]),
        phone: new FormControl('', [Validators.required, Validators.pattern(CustomRegExp.PHONE)]),
        password: new FormControl('', [Validators.required, Validators.pattern(CustomRegExp.PASSWORD)]),
        confirmPassword: new FormControl(''),
      },
      [MustMatch('password', 'confirmPassword')]
    );
  }

  // getter for form fields
  get f(): { [key: string]: AbstractControl } {
    return this.accountForm.controls;
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
  public toggleShowConfirmPassword(): void {
    this.isShowConfirmPassword = !this.isShowConfirmPassword;
  }
  public toggleShowPassword(): void {
    this.isShowPassword = !this.isShowPassword;
  }
}

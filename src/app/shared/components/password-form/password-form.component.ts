import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { CustomRegExp } from '../../../utils/CustomRegExp';
import { MustMatch } from '../../validator/form';
@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
})
export class PasswordFormComponent implements OnInit {
  public accountForm: FormGroup;
  // Condition form
  public isShowOldPassword = false;
  public isShowConfirmPassword = false;
  public isShowPassword = false;
  // Form output
  @Input() oldPasswordNeeded: boolean = false;
  @Output() passwordForm = new EventEmitter<string[]>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initPasswordForm();
  }

  private initPasswordForm(): void {
    if (!this.oldPasswordNeeded) {
      this.accountForm = this.formBuilder.group(
        {
          password: ['', [Validators.required, Validators.pattern(CustomRegExp.PASSWORD)]],
          confirmPassword: [''],
        },
        { validator: MustMatch('password', 'confirmPassword') }
      );
    } else {
      this.accountForm = this.formBuilder.group(
        {
          oldPassword: ['', [Validators.required, Validators.pattern(CustomRegExp.PASSWORD)]],
          password: ['', [Validators.required, Validators.pattern(CustomRegExp.PASSWORD)]],
          confirmPassword: [''],
        },
        { validator: MustMatch('password', 'confirmPassword') }
      );
    }
  }

  get fPassword(): { [key: string]: AbstractControl } {
    return this.accountForm.controls;
  }

  public showPassword(): void {
    this.isShowPassword = !this.isShowPassword;
  }

  public showConfirmPassword(): void {
    this.isShowConfirmPassword = !this.isShowConfirmPassword;
  }

  public showOldPassword(): void {
    this.isShowOldPassword = !this.isShowOldPassword;
  }

  public checkIfPasswordHasSpecialChar(password: string): boolean {
    if (password.match(CustomRegExp.SPECHAR)) return true;
    return false;
  }

  public checkIfPasswordHasDigit(password: string): boolean {
    if (password.match(CustomRegExp.DIGIT)) return true;
    return false;
  }

  public checkIfPasswordHasUpperCase(password: string): boolean {
    if (password.match(CustomRegExp.UPPERCASE)) return true;
    return false;
  }

  public checkIfPasswordHasLowerCase(password: string): boolean {
    if (password.match(CustomRegExp.LOWERCASE)) return true;
    return false;
  }

  public onSubmitPassword(): void {
    // stop here if form is invalid
    if (this.accountForm.invalid) {
      return;
    }

    if (this.oldPasswordNeeded) {
      this.passwordForm.emit([this.accountForm.value.password, this.accountForm.value.oldPassword]);
    } else {
      this.passwordForm.emit([this.accountForm.value.password]);
    }
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../../../../models/user.model';
import { CustomRegExp } from '../../../../utils/CustomRegExp';

@Component({
  selector: 'app-account-credentials',
  templateUrl: './account-credentials.component.html',
  styleUrls: ['./account-credentials.component.scss'],
})
export class AccountCredentialsComponent {
  @Input() accountForm: FormGroup;
  @Input() isAccountMode: boolean;
  @Input() profile: User;
  @Output() validateForm = new EventEmitter<any>();
  @Output() userExists = new EventEmitter<any>();

  public isShowConfirmPassword = false;
  public isShowPassword = false;

  public showPassword(): void {
    this.isShowPassword = !this.isShowPassword;
  }
  public showConfirmPassword(): void {
    this.isShowConfirmPassword = !this.isShowConfirmPassword;
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
  public setValidationsForm() {
    this.validateForm.emit();
  }
  public verifyUserExist(value: string) {
    this.userExists.emit(value);
  }
}

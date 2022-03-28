import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { User } from '../../../models/user.model';
import { ProfileService } from '../../../profile/services/profile.service';
import { formType } from '../formType.enum';
import { accountFormStep } from './accountFormStep.enum';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
})
export class AccountFormComponent implements OnChanges {
  @Input() nbSteps: number;
  @Input() currentStep: accountFormStep;
  @Input() accountForm: FormGroup;
  public isClaimMode = false;
  public isAccountMode = false;
  public pagesValidation = [];
  public userAcceptSavedDate = false;
  public isPageValid: boolean;
  public profile: User;
  public accountFormStepEnum = accountFormStep;
  public formType = formType;
  @Output() pageValid = new EventEmitter<any>();
  @Output() acceptNewsletter = new EventEmitter<any>();

  constructor(private profileService: ProfileService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentStep) {
      if (this.currentStep === accountFormStep.accountNewsletter) {
        this.pageValid.emit();
      }
    }
  }
  public setValidationsForm(): void {
    this.pagesValidation[accountFormStep.accountInfo] = {
      valid:
        this.accountForm.get('surname').valid &&
        this.accountForm.get('name').valid &&
        this.accountForm.get('phone').valid,
    };
    this.pagesValidation[accountFormStep.accountCredentials] = {
      valid:
        this.accountForm.get('email').valid &&
        this.accountForm.get('password').valid &&
        this.accountForm.get('confirmPassword').valid,
    };

    this.updatePageValid();
  }

  public verifyUserExist(inputEmail): void {
    if (this.accountForm.get('email').valid) {
      this.profileService.isEmailAlreadyUsed(inputEmail).subscribe((isExist) => {
        if (isExist) {
          this.accountForm.get('email').setErrors({ alreadyExist: true });
          this.setValidationsForm();
        }
      });
    }
  }

  /**
   * Update valid page or return page validity of the given index
   * @param {number} [index] - Page index
   */
  private updatePageValid(index?: number): boolean {
    if (index) {
      return this.pagesValidation[index].valid;
    }
    this.isPageValid = this.pagesValidation[this.currentStep].valid;
    if (this.isPageValid) this.pageValid.emit();
    return this.isPageValid;
  }
  public acceptReceiveNewsletter(accept: boolean): void {
    this.acceptNewsletter.emit(accept);
  }
}

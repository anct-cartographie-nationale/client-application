import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { formType } from '../formType.enum';
import { profileFormStep } from './profileFormStep.enum';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
})
export class ProfileFormComponent {
  @Input() profileForm: FormGroup;
  @Input() nbSteps: number;
  @Input() currentStep: profileFormStep;
  @Output() pageValid = new EventEmitter<any>();
  @Output() goNext = new EventEmitter<any>();

  public isPageValid: boolean;
  public profileFormStepEnum = profileFormStep;
  public pagesValidation = [];
  public formTypeEnum = formType;

  public setValidationsForm(): void {
    this.pagesValidation[profileFormStep.profileBeginningInfo] = {
      valid: true,
    };
    this.pagesValidation[profileFormStep.profileEmployerSelection] = {
      valid: this.profileForm.get('employer').valid,
    };
    this.pagesValidation[profileFormStep.profileJobSelection] = {
      valid: this.profileForm.get('job').get('name').valid,
    };
    this.updatePageValid();
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
    if (this.isPageValid) {
      if (this.currentStep === profileFormStep.profileBeginningInfo) {
        this.goNext.emit();
      } else {
        this.pageValid.emit();
      }
    } else {
      this.pageValid.emit(false);
    }
    return this.isPageValid;
  }
}

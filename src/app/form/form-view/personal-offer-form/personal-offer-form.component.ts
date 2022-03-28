import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { formType } from '../formType.enum';
import { personalOfferFormStep } from './personalOfferFormStep.enum';

@Component({
  selector: 'app-personal-offer-form',
  templateUrl: './personal-offer-form.component.html',
})
export class PersonalOfferFormComponent {
  @Input() nbSteps: number;
  @Input() currentStep: personalOfferFormStep;
  @Input() personalOfferForm: FormGroup;
  @Input() structureName: string;
  @Output() setHasOtherOffer = new EventEmitter<boolean>();
  @Output() pageValid = new EventEmitter<any>();

  public personalOfferFormStep = personalOfferFormStep;
  public formTypeEnum = formType;

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentStep) {
      if (
        this.currentStep === personalOfferFormStep.personalOfferAccompaniment ||
        this.currentStep === personalOfferFormStep.personalOfferTrainingType
      ) {
        this.pageValid.emit();
      }
    }
  }

  public validPage(): void {
    this.pageValid.emit();
  }

  public setOtherOffer(flag: boolean): void {
    this.setHasOtherOffer.emit(flag);
  }

  public goToProfile(): void {
    this.router.navigateByUrl('/profile');
  }
}

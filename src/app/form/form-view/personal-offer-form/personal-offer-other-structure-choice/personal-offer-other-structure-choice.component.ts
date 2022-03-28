import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-personal-offer-other-structure-choice',
  templateUrl: './personal-offer-other-structure-choice.component.html',
})
export class PersonalOfferOtherStructureChoiceComponent {
  @Input() structureName: string;
  @Input() personalOfferForm: FormGroup;
  @Output() setOtherOffer = new EventEmitter<boolean>();
  @Output() pageValid = new EventEmitter<any>();

  public choice: boolean;

  public onRadioChange(value: boolean): void {
    this.setOtherOffer.emit(value);
    this.pageValid.emit();
  }
}

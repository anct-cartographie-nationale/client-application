import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../../../../models/user.model';
import { Utils } from '../../../../utils/utils';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
})
export class AccountInfoComponent {
  @Input() accountForm: FormGroup;
  @Input() isClaimMode: boolean;
  @Input() profile: User;

  @Output() validateForm = new EventEmitter<any>();

  constructor(public utils: Utils) {}

  public setValidationsForm() {
    this.validateForm.emit();
  }
}

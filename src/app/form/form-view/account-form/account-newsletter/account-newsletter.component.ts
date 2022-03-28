import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-account-newsletter',
  templateUrl: './account-newsletter.component.html',
})
export class AccountNewsletterComponent {
  @Input() accountForm: FormGroup;
  @Input() profile: User;
  @Output() acceptNewsletter = new EventEmitter<any>();

  public acceptReceiveNewsletter(accepts: boolean) {
    this.acceptNewsletter.emit(accepts);
  }
}

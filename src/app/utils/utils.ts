import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class Utils {
  public modifyPhoneInput(form: FormGroup, controlName: string, phoneNumber: string): void {
    // Take length of phone number without spaces.
    const phoneNoSpace = phoneNumber.replace(/\s/g, '');
    // Check to refresh every 2 number.
    if (phoneNoSpace.length % 2 === 0) {
      // Add space every 2 number
      form.get(controlName).setValue(phoneNoSpace.replace(/(?!^)(?=(?:\d{2})+$)/g, ' ')); //NOSONAR
    }
  }

  public modifyPhoneValue(phoneNumber: string): string {
    // Take length of phone number without spaces.
    const phoneNoSpace = phoneNumber.replace(/\s/g, '');
    // Check to refresh every 2 number.
    if (phoneNoSpace.length % 2 === 0) {
      // Add space every 2 number
      return phoneNoSpace.replace(/(?!^)(?=(?:\d{2})+$)/g, ' '); //NOSONAR
    }
    return phoneNumber;
  }
}

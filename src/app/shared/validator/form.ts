import { AbstractControl, FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string): any {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

export function CheckHours(opening: string) {
  return (control: AbstractControl) => {
    const regex = new RegExp('([0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]');
    if (regex.test(control.value) && new Date('1/1/1999 ' + opening) < new Date('1/1/1999 ' + control.value)) {
      return null;
    } else {
      return { forbiddenName: { value: control.value } };
    }
  };
}

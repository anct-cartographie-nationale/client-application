import { AbstractControl, FormGroup } from '@angular/forms';

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

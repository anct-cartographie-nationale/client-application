import { Directive, HostListener, Input } from '@angular/core';
import { FormControlName, FormGroupDirective } from '@angular/forms';

@Directive({
  selector: 'input[type=radio][formControlName][appUncheckableRadio]'
})
export class UncheckableRadioDirective<T> {
  @Input() value?: T = undefined;

  @HostListener('click') public uncheckIfSelected() {
    this.value === this._formControlNameDirective.value && this._formControlNameDirective.control.setValue(null);
  }

  public constructor(private readonly _formControlNameDirective: FormControlName) {}
}

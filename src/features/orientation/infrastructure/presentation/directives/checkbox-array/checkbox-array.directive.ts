import { Directive, forwardRef, HostListener, Input } from '@angular/core';
import { ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'input[type=checkbox][value][formControlName][appCheckboxArray]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxArrayDirective),
      multi: true
    }
  ]
})
export class CheckboxArrayDirective<T> implements ControlValueAccessor {
  @HostListener('change', ['$event.target']) public onChange(event: HTMLInputElement) {
    this.writeValue(event.checked);
  }

  @Input() public value!: T;

  @Input() public formControlName!: string;

  private _onChange = (value: (T | undefined)[]) => {};

  private _onTouched = () => {};

  public constructor(private readonly _controlContainer: ControlContainer) {}

  public writeValue(shouldWrite: boolean): void {
    this._onChange(shouldWrite ? this.appendValue() : this.removeValue());
  }

  private removeValue(): T[] {
    return [...this.previousValue().filter((previousValue: T) => previousValue !== this.value)];
  }

  private appendValue(): T[] {
    return [...this.previousValue(), this.value];
  }

  private previousValue(): T[] {
    return this._controlContainer.control?.get(this.formControlName)?.value ?? [];
  }

  public registerOnChange(fn: (rating: (T | undefined)[]) => void): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }
}

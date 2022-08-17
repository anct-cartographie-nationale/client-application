import { Directive } from '@angular/core';

export interface CanHavePopup<T> {
  get popupHolder(): T | undefined;
}

@Directive()
export abstract class CanHavePopupDirective<T> implements CanHavePopup<T> {
  public abstract get popupHolder(): T | undefined;
}

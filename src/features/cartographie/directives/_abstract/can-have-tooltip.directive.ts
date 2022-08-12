import { Directive } from '@angular/core';

export interface CanHaveTooltip<T> {
  get tooltipHolder(): T | undefined;
}

@Directive()
export abstract class CanHaveTooltipDirective<T> implements CanHaveTooltip<T> {
  public abstract get tooltipHolder(): T | undefined;
}

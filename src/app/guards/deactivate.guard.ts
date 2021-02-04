import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IDeactivateComponent {
  canExit: () => Observable<boolean> | Promise<boolean> | boolean;
}

/**
 * Guard to confirm we are leaving. Otherwise stay at current route.
 */
@Injectable()
export class DeactivateGuard implements CanDeactivate<Object> {
  component: Object;

  constructor() {}

  canDeactivate(component: IDeactivateComponent): Observable<boolean> | Promise<boolean> | boolean {
    return component.canExit();
  }
}

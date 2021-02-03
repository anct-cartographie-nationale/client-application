import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface IDeactivateComponent {
  canExit: () => Observable<boolean> | Promise<boolean> | boolean;
}

/**
 * Guard to confirm we are leaving. Otherwise stay at current route.
 */
@Injectable()
export class DeactivateGuard implements CanDeactivate<Object> {
  component: Object;
  route: ActivatedRouteSnapshot;

  constructor() {}

  canDeactivate(
    component: IDeactivateComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canExit();
  }
}

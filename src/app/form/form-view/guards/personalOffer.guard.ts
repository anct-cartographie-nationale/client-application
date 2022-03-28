import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
/**
 * Guard to assert that we are coming from the structure form. Otherwise redirect to home
 */
@Injectable()
export class PersonalOfferGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): UrlTree | boolean {
    if (route.routeConfig.path === 'personaloffer' && this.router.routerState.snapshot.url === '/form/structure') {
      return true;
    }
    return this.router.parseUrl('/home');
  }
}

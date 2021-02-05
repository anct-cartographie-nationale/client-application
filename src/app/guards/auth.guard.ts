import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

/**
 * Guard to assert that we are logged in. Otherwise redirect to home
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): UrlTree | boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    return this.router.parseUrl('/home');
  }
}

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../profile/services/profile.service';

/**
 * Guard to assert that we are logged in admin. Otherwise redirect to home
 */
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private profileService: ProfileService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): UrlTree | boolean {
    if (this.authService.isLoggedIn()) {
      if (this.profileService.isAdmin()) {
        return true;
      }
      return this.router.parseUrl('/profile');
    }
    return this.router.parseUrl('/home');
  }
}

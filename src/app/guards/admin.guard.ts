import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../profile/services/profile.service';
import decode from 'jwt-decode';
import { User } from '../models/user.model';
import { UserRole } from '../shared/enum/userRole.enum';
/**
 * Guard to assert that we are logged in admin. Otherwise redirect to home
 */
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private profileService: ProfileService) {}

  canActivate(route: ActivatedRouteSnapshot): UrlTree | boolean {
    if (this.authService.isLoggedIn() && this.profileService.isAdmin()) {
      return true;
    }
    return this.router.parseUrl('/home');
  }
}

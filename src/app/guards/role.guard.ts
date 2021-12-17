import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { ProfileService } from '../profile/services/profile.service';
import { AuthService } from '../services/auth.service';
import { RouteRole } from '../shared/enum/routeRole.enum';
/**
 * Guard to assert that a user is authorized to access route.
 * Admin can access everything
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private profileService: ProfileService, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): UrlTree | boolean {
    const allowedRoles = route.data['allowedRoles'];

    if (this.authService.isLoggedIn()) {
      if (this.profileService.isAdmin()) return true;
      if (allowedRoles.includes(RouteRole.structureAdmin)) {
        const structureId = route.params.id;
        if (this.profileService.isLinkedToStructure(structureId)) {
          return true;
        }
      }
      return this.router.parseUrl('/home');
    }
    return this.router.parseUrl('/home');
  }
}

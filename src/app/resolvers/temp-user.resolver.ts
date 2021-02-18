import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TempUser } from '../models/temp-user.model';
import { TempUserService } from '../services/temp-user.service';

@Injectable()
export class TempUserResolver implements Resolve<TempUser> {
  constructor(private tempUserService: TempUserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<TempUser> {
    const userId = route.queryParams.id;
    return this.tempUserService.getUser(userId).pipe(
      map((res) => res),
      catchError(() => {
        this.router.navigate(['/home']);
        return new Observable<TempUser>();
      })
    );
  }
}

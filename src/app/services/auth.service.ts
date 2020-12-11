import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserAuth } from '../models/user-auth.model';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<UserAuth>;
  public user: Observable<UserAuth>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<UserAuth>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): UserAuth {
    return this.userSubject.value;
  }

  public get token(): string {
    return this.userSubject.value.access_token;
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  public isLoggedIn(): boolean {
    if (this.userValue) {
      return new DateTime.local().setZone('Europe/Paris') < this.getExpiration();
    }
    return false;
  }

  public getExpiration(): DateTime {
    return DateTime.fromISO(this.userValue.expires_at, { zone: 'Europe/Paris' });
  }

  public register(user: User): Observable<any> {
    return this.http.post('api/users', user);
  }

  public login(email: string, password: string): Observable<any> {
    return this.http
      .post<UserAuth>('api/auth/login', { email, password })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  public verifyUser(userId: string, token: string): Observable<any> {
    return this.http.post(`api/users/verify/${userId}`, null, {
      params: { token },
    });
  }
}

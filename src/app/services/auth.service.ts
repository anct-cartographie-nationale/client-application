import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public login(email: string, password: string): Observable<any> {
    return this.http
      .post<User>('api/auth/login', { email, password })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  public register(user: User): Observable<any> {
    return this.http.post('api/users', user);
  }

  public verifyUser(userId: string, token: string): Observable<any> {
    return this.http.post(`api/users/verify/${userId}`, null, {
      params: { token },
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly baseUrl = 'api/users';

  constructor(private http: HttpClient) {}

  public getProfile(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/profile`);
  }

  public changePassword(newPassword: string, oldPassword: string): Observable<User> {
    return this.http.post<any>(`${this.baseUrl}/change-password`, { newPassword, oldPassword });
  }
  public verifyAndUpdateEmail(token: string): Observable<User> {
    return this.http.post<any>(`${this.baseUrl}/verify-change-email`, null, {
      params: { token },
    });
  }
  public changeEmail(newEmail: string, oldEmail: string): Observable<User> {
    return this.http.post<any>(`${this.baseUrl}/change-email`, { newEmail, oldEmail });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly baseUrl = 'api/users';
  private currentProfile: User = null;
  constructor(private http: HttpClient, private authService: AuthService) {}

  public async getProfile(): Promise<User> {
    // Get profil by API only on first time
    if (!this.currentProfile && this.authService.isLoggedIn()) {
      const profile = await this.http.get<User>(`${this.baseUrl}/profile`).toPromise();
      this.currentProfile = profile;
    }
    return this.currentProfile;
  }

  public isLinkedToStructure(idStructure: number): boolean {
    if (!this.authService.isLoggedIn()) {
      this.currentProfile = null;
    }
    if (!this.currentProfile) {
      return false;
    }
    return this.currentProfile.structuresLink.includes(idStructure);
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

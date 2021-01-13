import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import decode from 'jwt-decode';
import { UserRole } from '../../shared/enum/userRole.enum';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly baseUrl = 'api/users';
  private currentProfile: User = null;
  constructor(private http: HttpClient) {
    this.getProfile();
  }

  public async getProfile(): Promise<User> {
    // Get profil by API only on first time
    if (!this.currentProfile) {
      const profile = await this.http.get<User>(`${this.baseUrl}/profile`).toPromise();
      this.currentProfile = profile;
    }
    return this.currentProfile;
  }

  public setProfile(profile: User): void {
    this.currentProfile = profile;
  }

  public isLinkedToStructure(idStructure: number): boolean {
    if (!this.currentProfile) {
      return false;
    }
    return this.currentProfile.structuresLink.includes(idStructure);
  }

  public removeProfile(): void {
    this.currentProfile = null;
  }

  public createUserandLinkStructure(id: number, body: User): Observable<User> {
    body.pendingStructuresLink = [id];
    return this.http.post<any>(`${this.baseUrl}`, body);
  }

  public isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const token = user.accessToken;
      // decode the token to get its payload
      const tokenPayload: User = decode(token);
      if (tokenPayload.role == UserRole.admin) {
        return true;
      }
    }
    return false;
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

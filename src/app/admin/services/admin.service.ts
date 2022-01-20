import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsletterSubscription } from '../../models/subscription-model';
import { User } from '../../models/user.model';
import { StructureAdminInfo } from '../models/demandAttachment.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly baseUrl = 'api/admin';
  constructor(private http: HttpClient) {}

  // Return pendingAttachments of all profiles.
  public getPendingStructure(): Observable<StructureAdminInfo[]> {
    return this.http.get<StructureAdminInfo[]>(`${this.baseUrl}/pendingStructures`);
  }

  public getToClaimStructure(): Observable<StructureAdminInfo[]> {
    return this.http.get<StructureAdminInfo[]>(`${this.baseUrl}/unclaimedStructures`);
  }

  public getAllStructureAdmin(): Observable<any> {
    return this.http.get<StructureAdminInfo[]>(`${this.baseUrl}/adminStructuresList`);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`api/admin/searchUsers`);
  }

  public getAttachedUsers(): Observable<User[]> {
    return this.http.get<User[]>(`api/admin/getAttachedUsers`);
  }

  public getUnAttachedUsers(): Observable<User[]> {
    return this.http.get<User[]>(`api/admin/getUnAttachedUsers`);
  }

  public getUnVerifiedUsers(): Observable<User[]> {
    return this.http.get<User[]>(`api/admin/getUnVerifiedUsers`);
  }

  public searchUsers(searchString: string): Observable<User[]> {
    return this.http.post<User[]>(`${this.baseUrl}/searchUsers`, { searchString });
  }

  public deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/user/` + id);
  }

  public searchNewsletterSubscriptions(searchString: string): Observable<NewsletterSubscription[]> {
    return this.http.post<NewsletterSubscription[]>(`${this.baseUrl}/searchNewsletterSubscriptions`, { searchString });
  }

  public countNewsletterSubscriptions(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/countNewsletterSubscriptions`);
  }

  public unsubscribeEmail(email: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/newsletterSubscription/` + email);
  }

  public acceptStructureClaim(
    userEmail: string,
    structureId: number,
    structureName: string
  ): Observable<StructureAdminInfo[]> {
    return this.http.post<StructureAdminInfo[]>(`${this.baseUrl}/validatePendingStructure`, {
      userEmail,
      structureId,
      structureName,
    });
  }

  public refuseStructureClaim(
    userEmail: string,
    structureId: number,
    structureName: string
  ): Observable<StructureAdminInfo[]> {
    return this.http.post<StructureAdminInfo[]>(`${this.baseUrl}/rejectPendingStructure`, {
      userEmail,
      structureId,
      structureName,
    });
  }
}

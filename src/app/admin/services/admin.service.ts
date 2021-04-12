import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsletterSubscription } from '../../models/subscription-model';
import { User } from '../../models/user.model';
import { DemandAttachment } from '../models/demandAttachment.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly baseUrl = 'api/admin';
  constructor(private http: HttpClient) {}

  // Return pendingAttachments of all profiles.
  public getPendingStructure(): Observable<DemandAttachment[]> {
    return this.http.get<DemandAttachment[]>(`${this.baseUrl}/pendingStructures`);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`api/admin/searchUsers`);
  }

  public searchUsers(searchString: string): Observable<User[]> {
    return this.http.post<User[]>(`api/admin/searchUsers`, { searchString });
  }

  public deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`api/admin/user/` + id);
  }

  public searchNewsletterSubscriptions(searchString: string): Observable<NewsletterSubscription[]> {
    return this.http.post<NewsletterSubscription[]>(`api/admin/searchNewsletterSubscriptions`, { searchString });
  }

  public unsubscribeEmail(email: string): Observable<string> {
    return this.http.delete<string>(`api/admin/newsletterSubscription/` + email);
  }

  public acceptStructureClaim(
    userEmail: string,
    structureId: number,
    structureName: string
  ): Observable<DemandAttachment[]> {
    return this.http.post<DemandAttachment[]>(`${this.baseUrl}/validatePendingStructure`, {
      userEmail,
      structureId,
      structureName,
    });
  }

  public refuseStructureClaim(
    userEmail: string,
    structureId: number,
    structureName: string
  ): Observable<DemandAttachment[]> {
    return this.http.post<DemandAttachment[]>(`${this.baseUrl}/rejectPendingStructure`, {
      userEmail,
      structureId,
      structureName,
    });
  }
}

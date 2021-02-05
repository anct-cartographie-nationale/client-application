import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  public acceptStructureClaim(userEmail: string, structureId: number): Observable<DemandAttachment[]> {
    return this.http.post<DemandAttachment[]>(`${this.baseUrl}/validatePendingStructure`, { userEmail, structureId });
  }

  public refuseStructureClaim(userEmail: string, structureId: number): Observable<DemandAttachment[]> {
    return this.http.post<DemandAttachment[]>(`${this.baseUrl}/rejectPendingStructure`, { userEmail, structureId });
  }
}

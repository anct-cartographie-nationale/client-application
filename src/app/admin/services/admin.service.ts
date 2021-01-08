import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { demandAttachment } from '../models/demandAttachment.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  // Return pendingAttachments of all profiles.
  public getPendingAttachmentsStructure(): Observable<demandAttachment[]> {
    return this.http.get<any>('api/users/pendingAttachments');
  }

  // Todo : Api post qui retourne vrai si aucune erreur sinon httpException
  public acceptAttachmentStructure(mailUser, idStructure) {}

  // Todo : Api post qui retourne vrai si aucune erreur sinon httpException
  public refuseAttachmentStructure(mailUser, idStructure) {}
}

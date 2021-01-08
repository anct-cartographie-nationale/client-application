import { Injectable } from '@angular/core';
import { demandAttachment } from '../models/demandAttachment.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor() {}

  // Return pendingAttachments of all profiles.
  public getPendingAttachmentsStructure(): demandAttachment[] {
    return [{ userEmail: 'jb@test.fr', structureId: 53 }];
  }

  // Post
  public acceptAttachmentStructure(mailUser, idStructure): void {}

  // Post
  public refuseAttachmentStructure(mailUser, idStructure): void {}
}

import { Injectable } from '@angular/core';
import { demandAttachment } from '../models/demandAttachment.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor() {}

  // Return pendingAttachments of all profiles.
  public getPendingAttachmentsStructure(): demandAttachment[] {
    return [new demandAttachment()];
  }

  public acceptAttachmentStructure(mailUser, idStructure): void {}
  public refuseAttachmentStructure(mailUser, idStructure): void {}
}

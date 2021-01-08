import { Component, OnInit } from '@angular/core';
import { userInfo } from 'os';
import { Structure } from '../../../models/structure.model';
import { User } from '../../../models/user.model';
import { demandAttachment } from '../../models/demandAttachment.model';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-validation-attachment',
  templateUrl: './validation-attachment.component.html',
  styleUrls: ['./validation-attachment.component.scss'],
})
export class ValidationAttachmentComponent implements OnInit {
  demandsAttachment: demandAttachment[];
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.demandsAttachment = this.adminService.getPendingAttachmentsStructure();
  }

  public acceptDemand(demand: demandAttachment): void {
    console.log('accept');
    this.removeDemand(demand);
    this.adminService.acceptAttachmentStructure(demand.userEmail, demand.structureId);
  }

  public refuseDemand(demand: demandAttachment): void {
    console.log('refuse');
    this.adminService.refuseAttachmentStructure(demand.userEmail, demand.structureId);
    this.removeDemand(demand);
  }

  private removeDemand(demand: demandAttachment): void {
    const index = this.demandsAttachment.findIndex((d: demandAttachment) => d === demand);
    if (index > -1) {
      this.demandsAttachment.splice(index, 1);
    }
  }
}

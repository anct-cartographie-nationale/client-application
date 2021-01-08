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
    this.adminService.getPendingAttachmentsStructure().subscribe((demands) => {
      this.demandsAttachment = demands;
    });
  }

  // Todo : Appeler removeDemand(demand) dans le subscribe de acceptAttachmentStructure() quand l'api sera faite.
  public acceptDemand(demand: demandAttachment): void {
    console.log('accept');
    this.adminService.acceptAttachmentStructure(demand.userEmail, demand.structureId);
    this.removeDemand(demand);
  }

  // Todo : Appeler removeDemand(demand) dans le subscribe de acceptAttachmentStructure() quand l'api sera faite.
  public refuseDemand(demand: demandAttachment): void {
    console.log('refuse');
    this.adminService.refuseAttachmentStructure(demand.userEmail, demand.structureId);
    this.removeDemand(demand);
  }

  // Remove the request that was accepted or refused
  private removeDemand(demand: demandAttachment): void {
    const index = this.demandsAttachment.findIndex((d: demandAttachment) => d === demand);
    if (index > -1) {
      this.demandsAttachment.splice(index, 1);
    }
  }
}

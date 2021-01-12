import { Component, OnInit } from '@angular/core';
import { DemandAttachment } from '../../models/demandAttachment.model';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-claim-structure',
  templateUrl: './claim-structure.component.html',
  styleUrls: ['./claim-structure.component.scss'],
})
export class ClaimStructureComponent implements OnInit {
  public demandsAttachment: DemandAttachment[];
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getPendingStructure().subscribe((demands) => {
      this.demandsAttachment = demands;
    });
  }

  // Todo : Appeler removeDemand(demand) dans le subscribe de acceptAttachmentStructure() quand l'api sera faite.
  public acceptDemand(demand: DemandAttachment): void {
    console.log('accept');
    this.adminService.acceptStructureClaim(demand.userEmail, demand.structureId).subscribe((data) => {
      this.demandsAttachment = data;
    });
  }

  // Todo : Appeler removeDemand(demand) dans le subscribe de acceptAttachmentStructure() quand l'api sera faite.
  public refuseDemand(demand: DemandAttachment): void {
    console.log('refuse');
    this.adminService.refuseStructureClaim(demand.userEmail, demand.structureId).subscribe((data) => {
      this.demandsAttachment = data;
    });
  }

  // Remove the request that was accepted or refused
  // private removeDemand(demand: DemandAttachment): void {
  //   const index = this.demandsAttachment.findIndex((d: DemandAttachment) => d === demand);
  //   if (index > -1) {
  //     this.demandsAttachment.splice(index, 1);
  //   }
  // }
}

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

  public acceptDemand(demand: DemandAttachment): void {
    this.adminService.acceptStructureClaim(demand.userEmail, demand.structureId).subscribe((data) => {
      this.demandsAttachment = data;
    });
  }

  public refuseDemand(demand: DemandAttachment): void {
    this.adminService.refuseStructureClaim(demand.userEmail, demand.structureId).subscribe((data) => {
      this.demandsAttachment = data;
    });
  }
}

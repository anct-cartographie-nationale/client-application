import { Component, OnInit } from '@angular/core';
import { StructureAdminInfo } from '../../models/demandAttachment.model';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-claim-structure',
  templateUrl: './claim-structure.component.html',
  styleUrls: ['../../admin-pannel.scss'],
})
export class ClaimStructureComponent implements OnInit {
  public demandsAttachment: StructureAdminInfo[];
  public structuresUnclaimed: StructureAdminInfo[];
  public isClaimedStructure: boolean = true;
  public isUnclaimedStructure: boolean = false;
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getPendingStructure().subscribe((demands) => {
      this.demandsAttachment = demands;
    });
  }

  public acceptDemand(demand: StructureAdminInfo): void {
    this.adminService
      .acceptStructureClaim(demand.userEmail, demand.structureId, demand.structureName)
      .subscribe((data) => {
        this.demandsAttachment = data;
      });
  }

  public refuseDemand(demand: StructureAdminInfo): void {
    this.adminService
      .refuseStructureClaim(demand.userEmail, demand.structureId, demand.structureName)
      .subscribe((data) => {
        this.demandsAttachment = data;
      });
  }

  public claimedStructure(event: boolean): void {
    this.isClaimedStructure = !this.isClaimedStructure;
  }
}

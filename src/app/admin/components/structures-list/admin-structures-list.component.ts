import { Component, OnInit } from '@angular/core';
import { StructureAdminInfo } from '../../models/demandAttachment.model';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-structures-list',
  templateUrl: './admin-structures-list.component.html',
  styleUrls: ['../../admin-pannel.scss'],
})
export class AdminStructuresListComponent implements OnInit {
  public structuresInClaim: StructureAdminInfo[];
  public structuresToClaim: StructureAdminInfo[];
  public structuresClaimed: StructureAdminInfo[];
  public isClaimedStructure: boolean = false;
  public isToClaimStructure: boolean = false;
  public isInClaimStructure: boolean = true;
  public isAll: boolean = false;
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllStructureAdmin().subscribe((structures) => {
      this.structuresClaimed = structures.claimed;
      this.structuresInClaim = structures.inClaim;
      this.structuresToClaim = structures.toClaim;
    });
  }

  public claimedStructure(event: boolean): void {
    this.isClaimedStructure = !this.isClaimedStructure;
  }

  public toClaimStructure(event: boolean): void {
    this.isToClaimStructure = !this.isToClaimStructure;
  }

  public inClaimStructure(event: boolean): void {
    this.isInClaimStructure = !this.isInClaimStructure;
  }

  public allStructure(event: boolean): void {
    if (!this.isAll) {
      this.isAll = !this.isAll;
      this.isInClaimStructure = true;
      this.isToClaimStructure = true;
      this.isClaimedStructure = true;
    } else {
      this.isAll = !this.isAll;
      this.isInClaimStructure = false;
      this.isToClaimStructure = false;
      this.isClaimedStructure = false;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
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
  public structuresIncomplete: StructureAdminInfo[];
  public isAll: boolean = false;
  public isLoading: boolean = true;
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService
      .getAllStructureAdmin()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((structures) => {
        this.structuresClaimed = structures.claimed;
        this.structuresInClaim = structures.inClaim;
        this.structuresToClaim = structures.toClaim;
        this.structuresIncomplete = structures.incomplete;
      });
  }
}

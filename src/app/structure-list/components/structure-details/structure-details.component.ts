import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Structure } from '../../../models/structure.model';
import { Module } from '../../models/module.model';
import { Category } from '../../models/category.model';
import { AccessModality } from '../../enum/access-modality.enum';
import { SearchService } from '../../services/search.service';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { PrintService } from '../../../shared/service/print.service';
import { Equipment } from '../../enum/equipment.enum';
import { StructureService } from '../../../services/structure.service';
import { TclService } from '../../../services/tcl.service';
import { TclStopPoint } from '../../../models/tclStopPoint.model';
import { ProfileService } from '../../../profile/services/profile.service';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import { PublicCategorie } from '../../enum/public.enum';
@Component({
  selector: 'app-structure-details',
  templateUrl: './structure-details.component.html',
  styleUrls: ['./structure-details.component.scss'],
})
export class StructureDetailsComponent implements OnInit {
  @Input() public structure: Structure;
  @Output() public closeDetails: EventEmitter<boolean> = new EventEmitter<boolean>();
  public accessModality = AccessModality;

  public baseSkillssReferentiel: Category;
  public accessRightsReferentiel: Category;
  public baseSkills: Module[];
  public accessRights: Module[];
  public tclStopPoints: TclStopPoint[] = [];
  public printMode = false;
  public isClaimed: boolean = null;
  public isLoading: boolean = false;
  public currentProfile: User = null;
  public deleteModalOpenned = false;
  public claimModalOpenned = false;

  constructor(
    private printService: PrintService,
    private searchService: SearchService,
    private structureService: StructureService,
    private tclService: TclService,
    private profileService: ProfileService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.url.subscribe((url) => {
      if (url[0].path === 'structure') {
        this.structure = this.printService.structure;
        this.printMode = true;
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    if (this.userIsLoggedIn()) {
      this.currentProfile = await this.profileService.getProfile();
    }
    this.isClaimed = await this.structureService.isClaimed(this.structure._id, this.currentProfile).toPromise();
    // GetTclStopPoints
    this.getTclStopPoints();
    this.searchService.getCategoriesTraining().subscribe((referentiels) => {
      referentiels.forEach((referentiel) => {
        if (referentiel.isBaseSkills()) {
          this.baseSkillssReferentiel = referentiel;
        } else if (referentiel.isRigthtsAccess()) {
          this.accessRightsReferentiel = referentiel;
        }
      });
      this.setServiceCategories();
      if (this.printMode) {
        this.printService.onDataReady();
      }
      this.isLoading = false;
    });
    const index = this.structure.proceduresAccompaniment.indexOf('autres');
    if (index > -1) {
      this.structure.proceduresAccompaniment.splice(index, 1);
    }
  }

  public userIsLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public getEquipmentsLabel(equipment: Equipment): string {
    switch (equipment) {
      case Equipment.wifi:
        return 'Wifi en accès libre';
      case Equipment.bornes:
        return 'Bornes numériques';
      case Equipment.printer:
        return 'Imprimantes';
      case Equipment.tablet:
        return 'Tablettes';
      case Equipment.computer:
        return 'Ordinateurs à disposition';
      case Equipment.scanner:
        return 'Scanners';
      default:
        return null;
    }
  }

  public close(refreshRequired: boolean): void {
    this.closeDetails.emit(refreshRequired);
  }

  public print(): void {
    this.printService.printDocument('structure', this.structure);
  }

  public toggleDeleteModal(): void {
    this.deleteModalOpenned = !this.deleteModalOpenned;
  }

  public toggleClaimModal(): void {
    this.claimModalOpenned = !this.claimModalOpenned;
  }

  public deleteStructure(shouldDelete: boolean): void {
    this.toggleDeleteModal();
    if (shouldDelete) {
      this.structureService.delete(this.structure._id).subscribe((res) => {
        this.reload();
      });
    }
  }

  private reload(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.route });
  }

  public claimStructure(shouldClaim: boolean): void {
    this.toggleClaimModal();
    if (shouldClaim) {
      this.profileService.getProfile().then((user: User) => {
        this.structureService.claimStructureWithAccount(this.structure._id, user).subscribe(() => {
          this.isClaimed = true;
        });
      });
    }
  }

  public getAccessLabel(accessModality: AccessModality): string {
    switch (accessModality) {
      case AccessModality.free:
        return 'Accès libre';
      case AccessModality.meeting:
        return 'Sur rendez-vous';
      case AccessModality.meetingOnly:
        return 'Uniquement sur RDV';
      case AccessModality.numeric:
        return 'Téléphone / Visio';
      default:
        return null;
    }
  }

  public getPublicLabel(tagetPublic: PublicCategorie): string {
    switch (tagetPublic) {
      case PublicCategorie.young:
        return 'Jeunes (16 - 25 ans)';
      case PublicCategorie.adult:
        return 'Adultes (25 - 65 ans)';
      case PublicCategorie.elderly:
        return 'Séniors (+ de 65 ans)';
      case PublicCategorie.all:
        return 'Tout public';
      case PublicCategorie.under16Years:
        return 'Moins de 16 ans';
      default:
        return null;
    }
  }

  public setServiceCategories(): void {
    this.baseSkills = this.structure.baseSkills.map((skill) =>
      _.find(this.baseSkillssReferentiel.modules, { id: skill })
    );
    this.accessRights = this.structure.accessRight.map((rights) =>
      _.find(this.accessRightsReferentiel.modules, { id: rights })
    );
  }

  public keepOriginalOrder = (a, b) => a.key;

  public isBaseSkills(): boolean {
    return this.baseSkills && this.baseSkills[0] !== undefined;
  }
  public isAccessRights(): boolean {
    return this.accessRights && this.accessRights[0] !== undefined;
  }

  public getTclStopPoints(): void {
    this.tclService.getTclStopPointBycoord(this.structure.getLon(), this.structure.getLat()).subscribe((res) => {
      this.tclStopPoints = res;
    });
  }
  public filterOnlyEquipments(equipmentsAndServices: string[]): string[] {
    return equipmentsAndServices.filter((eqpt) =>
      ['ordinateurs', 'tablettes', 'bornesNumeriques', 'imprimantes', 'scanners', 'wifiEnAccesLibre'].includes(eqpt)
    );
  }
}

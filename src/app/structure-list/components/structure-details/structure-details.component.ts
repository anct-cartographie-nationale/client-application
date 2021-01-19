import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Structure } from '../../../models/structure.model';
import { Module } from '../../models/module.model';
import { Category } from '../../models/category.model';
import { AccessModality } from '../../enum/access-modality.enum';
import { SearchService } from '../../services/search.service';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { PrintService } from '../../../shared/service/print.service';
import { Equipment } from '../../enum/equipment.enum';
import { typeStructureEnum } from '../../../shared/enum/typeStructure.enum';
import { StructureService } from '../../../services/structure.service';
import { TclService } from '../../../services/tcl.service';
import { TclStopPoint } from '../../../models/tclStopPoint.model';
import { ProfileService } from '../../../profile/services/profile.service';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-structure-details',
  templateUrl: './structure-details.component.html',
  styleUrls: ['./structure-details.component.scss'],
})
export class StructureDetailsComponent implements OnInit {
  @Input() public structure: Structure;
  @Output() public closeDetails: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public updatedStructure: EventEmitter<Structure> = new EventEmitter<Structure>();
  public accessModality = AccessModality;

  public baseSkillssReferentiel: Category;
  public accessRightsReferentiel: Category;
  public baseSkills: Module[];
  public accessRights: Module[];
  public tclStopPoints: TclStopPoint[] = [];
  public printMode = false;
  public isOtherSection = false;
  public showForm = false;
  public isClaimed: boolean = null;
  public isLoading: boolean = false;
  public isEditMode: boolean = false;
  public currentProfile: User = null;

  constructor(
    route: ActivatedRoute,
    private printService: PrintService,
    private searchService: SearchService,
    private structureService: StructureService,
    private tclService: TclService,
    private profileService: ProfileService,
    private authService: AuthService
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
    if (this.authService.isLoggedIn()) {
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
      this.isOtherSection = true;
    }
  }

  public getEquipmentsIcon(equipment: Equipment): string {
    switch (equipment) {
      case Equipment.wifi:
        return 'wifi';
      case Equipment.bornes:
        return 'borne';
      case Equipment.printer:
        return 'print';
      case Equipment.tablet:
        return 'tablet';
      case Equipment.computer:
        return 'computer';
      default:
        return null;
    }
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
      default:
        return null;
    }
  }

  public close(): void {
    this.closeDetails.emit(true);
  }

  public print(): void {
    this.printService.printDocument('structure', this.structure);
  }

  public editStructure(): void {
    this.isEditMode = true;
    this.displayForm();
  }

  public claimStructure(): void {
    this.isEditMode = false;
    this.displayForm();
  }
  // Show/hide form structure
  public displayForm(): void {
    this.showForm = !this.showForm;
  }

  public updateStructure(s: Structure): void {
    this.structure = new Structure({ ...this.structure, ...s });
    this.updatedStructure.emit(this.structure);
    this.displayForm();
    this.ngOnInit();
  }
  public getAccessIcon(accessModality: AccessModality): string {
    switch (accessModality) {
      case AccessModality.free:
        return 'group';
      case AccessModality.meeting:
        return 'calendar';
      case AccessModality.meetingOnly:
        return 'calendar';
      case AccessModality.numeric:
        return 'tel';
      default:
        return null;
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
}

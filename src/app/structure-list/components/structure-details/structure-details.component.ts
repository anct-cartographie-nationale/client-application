import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Structure } from '../../../models/structure.model';
import { Module } from '../../models/module.model';
import { Category } from '../../models/category.model';
import { AccessModality } from '../../enum/access-modality.enum';
import { SearchService } from '../../services/search.service';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { PrintService } from '../../../shared/service/print.service';
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
  public printMode = false;
  public isOtherSection = false;

  constructor(route: ActivatedRoute, private printService: PrintService, private searchService: SearchService) {
    route.url.subscribe((url) => {
      if (url[0].path === 'structure') {
        this.structure = this.printService.structure;
        this.printMode = true;
      }
    });
  }

  ngOnInit(): void {
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
    });
    const index = this.structure.accompagnementDesDemarches.indexOf('Autres');
    if (index > -1) {
      this.structure.accompagnementDesDemarches.splice(index, 1);
      this.isOtherSection = true;
    }
  }

  public close(): void {
    this.closeDetails.emit(true);
  }

  public print(): void {
    this.printService.printDocument('structure', this.structure);
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

  public setServiceCategories(): void {
    this.baseSkills = this.structure.lesCompetencesDeBase.map((skill) =>
      _.find(this.baseSkillssReferentiel.modules, { id: skill })
    );
    this.accessRights = this.structure.accesAuxDroits.map((rights) =>
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
}

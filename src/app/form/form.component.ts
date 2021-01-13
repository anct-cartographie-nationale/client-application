import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Structure } from '../models/structure.model';
import { Time } from '../models/time.model';
import { Day } from '../models/day.model';
import { StructureService } from '../services/structure.service';
import { SearchService } from '../structure-list/services/search.service';
import { Category } from '../structure-list/models/category.model';
import { CategoryEnum } from '../shared/enum/category.enum';
import { EquipmentAccess } from '../shared/enum/equipmentAccess.enum';
import { WeekDayEnum } from '../shared/enum/weekDay.enum';
import { typeStructureEnum } from '../shared/enum/typeStructure.enum';
import { FonctionContactEnum } from '../shared/enum/fonctionContact.enum';
import { ProfileService } from '../profile/services/profile.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-structureForm',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() public idStructure?: number;
  @Input() public isEditMode: boolean;
  @Input() public profile?: User;
  @Output() closeEvent = new EventEmitter<Structure>();
  public structureForm: FormGroup;

  public userAlreadyExist = false;

  public equipmentAccess = EquipmentAccess;
  public weekDay = WeekDayEnum;
  public typeStructure = typeStructureEnum;
  public fonctions = FonctionContactEnum;
  public categoryTraining: Category[];
  public labelsQualifications: Category;
  public publics: Category;
  public accessModality: Category;
  public publicsAccompaniment: Category;
  public equipmentsAndServices: Category;
  public proceduresAccompaniment: Category;
  public structureId: number;
  constructor(
    private structureService: StructureService,
    private searchService: SearchService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    if (this.idStructure) {
      this.structureService.getStructure(this.idStructure).subscribe((structure) => {
        this.initForm(structure);
        this.structureId = structure.id;
      });
    } else {
      this.initForm(new Structure());
    }
    this.searchService.getCategoriesAccompaniment().subscribe((categories: Category[]) => {
      this.proceduresAccompaniment = categories[0];
    });
    this.searchService.getCategoriesMoreFilters().subscribe((categories: Category[]) => {
      categories.forEach((categ) => {
        switch (categ.id) {
          case CategoryEnum.accessModality: {
            this.accessModality = categ;
            break;
          }
          case CategoryEnum.equipmentsAndServices: {
            this.equipmentsAndServices = categ;
            break;
          }
          case CategoryEnum.labelsQualifications: {
            this.labelsQualifications = categ;
            break;
          }
          case CategoryEnum.publics: {
            this.publics = categ;
            break;
          }
          case CategoryEnum.publicsAccompaniment: {
            this.publicsAccompaniment = categ;
            break;
          }
        }
      });
    });

    this.searchService.getCategoriesTraining().subscribe((t) => {
      this.categoryTraining = t;
    });
  }

  private initForm(structure: Structure): void {
    // Init form
    this.structureForm = new FormGroup({
      id: new FormControl(structure.id),
      coord: new FormControl(structure.coord),
      structureType: this.loadArrayForCheckbox(structure.structureType, true),
      structureName: new FormControl(structure.structureName, Validators.required),
      structureRepresentation: new FormControl(structure.structureRepresentation, Validators.required),
      description: new FormControl(structure.description, Validators.required),
      lockdownActivity: new FormControl(structure.lockdownActivity),
      address: new FormGroup({
        numero: new FormControl(structure.address.numero),
        street: new FormControl(structure.address.street, Validators.required),
        commune: new FormControl(structure.address.commune, Validators.required),
      }),
      contactPhone: new FormControl(structure.contactPhone, [
        Validators.required,
        Validators.pattern('([0-9]{2} ){4}[0-9]{2}'),
      ]),
      contactMail: new FormControl(structure.contactMail, [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ]),
      website: new FormControl(structure.website),
      facebook: new FormControl(structure.facebook),
      twitter: new FormControl(structure.twitter),
      instagram: new FormControl(structure.instagram),
      gender: new FormControl(structure.gender),
      contactName: new FormControl(structure.contactName),
      contactSurname: new FormControl(structure.contactSurname),
      fonction: new FormControl(structure.fonction),
      pmrAccess: new FormControl(structure.pmrAccess),
      documentsMeeting: new FormControl(structure.documentsMeeting),
      hours: new FormGroup({
        monday: this.createDay(structure.hours.monday),
        tuesday: this.createDay(structure.hours.tuesday),
        wednesday: this.createDay(structure.hours.wednesday),
        thursday: this.createDay(structure.hours.thursday),
        friday: this.createDay(structure.hours.friday),
        saturday: this.createDay(structure.hours.saturday),
        sunday: this.createDay(structure.hours.sunday),
      }),
      exceptionalClosures: new FormControl(structure.exceptionalClosures),
      labelsQualifications: this.loadArrayForCheckbox(structure.labelsQualifications, false),
      accessModality: this.loadArrayForCheckbox(structure.accessModality, true),
      publicsAccompaniment: this.loadArrayForCheckbox(structure.publicsAccompaniment, false),
      proceduresAccompaniment: this.loadArrayForCheckbox(structure.proceduresAccompaniment, false),
      equipmentsAndServices: this.loadArrayForCheckbox(structure.equipmentsAndServices, false),
      publics: this.loadArrayForCheckbox(structure.publics, true),
      baseSkills: this.loadArrayForCheckbox(structure.baseSkills, false),
      accessRight: this.loadArrayForCheckbox(structure.accessRight, false),
      parentingHelp: this.loadArrayForCheckbox(structure.parentingHelp, false),
      socialAndProfessional: this.loadArrayForCheckbox(structure.socialAndProfessional, false),
      digitalCultureSecurity: this.loadArrayForCheckbox(structure.digitalCultureSecurity, false),
      nbComputers: new FormControl(structure.equipmentsAndServices.includes('ordinateurs') ? structure.nbComputers : 0),
      nbPrinters: new FormControl(structure.equipmentsAndServices.includes('imprimantes') ? structure.nbPrinters : 0),
      nbTablets: new FormControl(structure.equipmentsAndServices.includes('tablettes') ? structure.nbTablets : 0),
      nbNumericTerminal: new FormControl(
        structure.equipmentsAndServices.includes('bornesNumeriques') ? structure.nbNumericTerminal : 0
      ),
      equipmentsDetails: new FormControl(structure.equipmentsDetails),
      equipmentsAccessType: this.loadArrayForCheckbox(structure.equipmentsAccessType, false),
    });

    // Disable form when it's to claim.
    if (!this.isEditMode && this.idStructure) {
      Object.keys(this.structureForm.controls).forEach((controlName) => {
        this.structureForm.controls[controlName].disable();
      });
    }
  }

  private loadArrayForCheckbox(array: string[], isRequired: boolean): FormArray {
    return new FormArray(
      array.map((str) => new FormControl(str)),
      isRequired ? Validators.required : Validators.nullValidator
    );
  }
  public getStructureControl(nameControl: string): AbstractControl {
    return this.structureForm.get(nameControl);
  }

  public getAddressControl(nameControl: string): AbstractControl {
    return this.structureForm.get('address').get(nameControl);
  }

  public modifyPhoneInput(phoneNumber: string): void {
    // Take length of phone number without spaces.
    let phoneNoSpace = phoneNumber.replace(/\s/g, '');
    // Check to refresh every 2 number.
    if (phoneNoSpace.length % 2 == 0) {
      // Add space every 2 number
      this.structureForm.get('contactPhone').setValue(phoneNoSpace.replace(/(?!^)(?=(?:\d{2})+$)/g, ' ')); //NOSONAR
    }
  }

  public getTime(day: string): FormArray {
    return this.structureForm.get('hours').get(day).get('time') as FormArray;
  }

  public isOpen(day: string): boolean {
    return this.structureForm.get('hours').get(day).get('open').value;
  }

  private createDay(day: Day): FormGroup {
    return new FormGroup({
      open: new FormControl(day.open, Validators.required),
      time: new FormArray(day.time.map((oneTime) => this.createTime(oneTime))) as FormArray,
    });
  }
  private createTime(time: Time): FormGroup {
    return new FormGroup({
      openning: new FormControl(time.openning),
      closing: new FormControl(time.closing),
    });
  }

  public addTime(day: string): void {
    if (!this.structureForm.get('hours').get(day).value.open) {
      this.getTime(day).push(this.createTime(new Time()));
    }
  }

  public removeTime(day: string, time: Time): void {
    const index = this.getTime(day).controls.findIndex((element) => element.value == time);
    this.getTime(day).removeAt(index);
  }

  public onCheckPlageHoursChange(event, day, time: Time): void {
    if (event.target.checked) {
      this.getTime(day).push(this.createTime(new Time()));
    } else {
      this.removeTime(day, time);
    }
  }

  public onCheckChange(event, formControlName: string): void {
    const formArray: FormArray = this.structureForm.get(formControlName) as FormArray;
    if (event.target.checked) {
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    } else {
      // Remove uncheck control in the arrayForm
      const index = formArray.controls.findIndex((element) => element.value == event.target.value);
      formArray.removeAt(index);
    }
  }

  public isInArray(term: string, formControlName): boolean {
    if (this.structureForm.controls[formControlName].value) {
      return this.structureForm.controls[formControlName].value.includes(term);
    }
    return false;
  }
  public onSubmitClaim(accountForm: FormGroup): void {
    if (!this.structureForm.invalid && accountForm.valid) {
      this.profileService.createUserandLinkStructure(this.structureId, accountForm.value).subscribe((user) => {
        this.closeEvent.emit(this.structureForm.value);
      });
    }
  }

  public onSubmitClaimWithAccount(): void {
    this.structureService
      .claimStructureWithAccount(this.structureId, this.profile.email)
      .subscribe((structuresLinked) => {
        this.profile.pendingStructuresLink = structuresLinked;
        this.profileService.setProfile(this.profile);
        this.closeEvent.emit(this.structureForm.value);
      });
  }
  public onSubmit(structureForm: FormGroup): void {
    if (structureForm.valid) {
      if (this.structureId) {
        this.structureService.editStructure(this.structureId, structureForm.value).subscribe((structure: Structure) => {
          this.closeEvent.emit(structure);
        });
      } else {
        this.structureService.createStructure(structureForm.value, this.profile).subscribe((structure: Structure) => {
          this.closeEvent.emit(structure);
        });
      }
    }
  }
}

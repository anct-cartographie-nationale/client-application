import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
import { MustMatch } from '../shared/validator/form';
import { Address } from '../models/address.model';
import { Week } from '../models/week.model';

@Component({
  selector: 'app-structureForm',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() public idStructure?: string;
  @Input() public isEditMode: boolean = true;
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
  public structureId: string;

  //New var form
  public currentPage = 10;
  public progressStatus = 0;
  public nbPagesForm = 13;
  public accountForm: FormGroup;
  public isPageValid: boolean;
  public pagesValidation = [];
  public isShowConfirmPassword = false;
  public isShowPassword = false;
  public hoursForm: FormGroup;
  //collapse var
  public showWebsite: boolean;
  public showSocialNetwork: boolean;

  constructor(
    private structureService: StructureService,
    private searchService: SearchService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    if (this.idStructure) {
      this.structureService.getStructure(this.idStructure).subscribe((structure) => {
        this.initForm(structure);
        this.structureId = structure._id;
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
    // Init account Form
    this.accountForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]),
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        phone: new FormControl('', [Validators.required, Validators.pattern('([0-9]{2} ){4}[0-9]{2}')]), //NOSONAR
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/), //NOSONAR
        ]),
        confirmPassword: new FormControl(''),
      },
      [MustMatch('password', 'confirmPassword')]
    );

    // Init form
    this.structureForm = new FormGroup({
      _id: new FormControl(structure._id),
      coord: new FormControl(structure.coord),
      structureType: new FormControl(structure.structureType, Validators.required),
      structureName: new FormControl(structure.structureName, Validators.required),
      structureRepresentation: new FormControl(structure.structureRepresentation, Validators.required),
      description: new FormControl(structure.description),
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
        Validators.pattern('[a-z0-9-]{1,}[@][a-z0-9-]{1,}[.][a-z]{2,3}'),
      ]),
      website: new FormControl(structure.website, [
        Validators.required,
        Validators.pattern('(www[.])[a-z0-9.-]*[.][a-z]{2,3}'),
      ]),
      facebook: new FormControl(structure.facebook, Validators.pattern('(facebook.com/[a-z0-9A-Z.-]{1,})')),
      twitter: new FormControl(structure.twitter, Validators.pattern('(twitter.com/[a-z0-9A-Z.-]{1,})')),
      instagram: new FormControl(structure.instagram, Validators.pattern('(instagram.com/[a-z0-9A-Z.-]{1,})')),
      linkedin: new FormControl(structure.linkedin, Validators.pattern('(linkedin.com/in/[a-z0-9A-Z.-]{1,})')),
      gender: new FormControl(structure.gender),
      contactName: new FormControl(structure.contactName),
      contactSurname: new FormControl(structure.contactSurname),
      fonction: new FormControl(structure.fonction),
      pmrAccess: new FormControl(structure.pmrAccess, Validators.required),
      documentsMeeting: new FormControl(structure.documentsMeeting),
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

    this.hoursForm = new FormGroup({
      monday: this.createDay(structure.hours.monday),
      tuesday: this.createDay(structure.hours.tuesday),
      wednesday: this.createDay(structure.hours.wednesday),
      thursday: this.createDay(structure.hours.thursday),
      friday: this.createDay(structure.hours.friday),
      saturday: this.createDay(structure.hours.saturday),
      sunday: this.createDay(structure.hours.sunday),
    });

    // Disable form when it's to claim.
    if (!this.isEditMode && this.idStructure) {
      Object.keys(this.structureForm.controls).forEach((controlName) => {
        this.structureForm.controls[controlName].disable();
      });
    }
    this.setValidationsForm();
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

  public modifyPhoneInput(form: FormGroup, controlName: string, phoneNumber: string): void {
    // Take length of phone number without spaces.
    let phoneNoSpace = phoneNumber.replace(/\s/g, '');
    // Check to refresh every 2 number.
    if (phoneNoSpace.length % 2 == 0) {
      // Add space every 2 number
      form.get(controlName).setValue(phoneNoSpace.replace(/(?!^)(?=(?:\d{2})+$)/g, ' ')); //NOSONAR
    }
    this.setValidationsForm();
  }

  private createDay(day: Day): FormGroup {
    return new FormGroup({
      open: new FormControl(day.open, Validators.required),
      time: new FormArray(day.time.map((oneTime) => this.createTime(oneTime))) as FormArray,
    });
  }
  private createTime(time: Time): FormGroup {
    return new FormGroup({
      openning: new FormControl(time.openning, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')),
      closing: new FormControl(time.closing, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')),
    });
  }

  public onCheckChange(event: boolean, formControlName: string, value: string): void {
    const formArray: FormArray = this.structureForm.get(formControlName) as FormArray;
    if (event) {
      // Add a new control in the arrayForm
      formArray.push(new FormControl(value));
    } else {
      // Remove uncheck control in the arrayForm
      const index = formArray.controls.findIndex((element) => element.value == value);
      formArray.removeAt(index);
    }
    this.setValidationsForm();
  }

  // Check if a FormControl value is in FormArray
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
    this.structureService.claimStructureWithAccount(this.structureId, this.profile).subscribe((structuresLinked) => {
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

  public setValidationsForm(): void {
    this.pagesValidation[0] = { valid: true };
    this.pagesValidation[1] = { valid: true };
    this.pagesValidation[2] = {
      valid:
        this.accountForm.get('surname').valid &&
        this.accountForm.get('name').valid &&
        this.accountForm.get('phone').valid,
    };
    this.pagesValidation[3] = {
      valid:
        this.accountForm.get('email').valid &&
        this.accountForm.get('password').valid &&
        this.accountForm.get('confirmPassword').valid,
    };
    this.pagesValidation[4] = {
      valid: this.getStructureControl('structureName').valid && this.getStructureControl('address').valid,
    };
    this.pagesValidation[5] = { valid: this.getStructureControl('structureType').valid };
    this.pagesValidation[6] = { valid: this.getStructureControl('accessModality').valid };
    this.pagesValidation[7] = { valid: this.hoursForm.valid };
    this.pagesValidation[8] = { valid: this.getStructureControl('description').valid };
    this.pagesValidation[9] = { valid: this.getStructureControl('pmrAccess').valid };
    this.pagesValidation[10] = {
      valid:
        this.getStructureControl('contactMail').valid &&
        (this.getStructureControl('website').valid || !this.showWebsite) &&
        ((this.getStructureControl('facebook').valid &&
          this.getStructureControl('twitter').valid &&
          this.getStructureControl('instagram').valid) ||
          !this.showSocialNetwork),
    };
    this.updatePageValid();
  }

  private updatePageValid(): void {
    this.isPageValid = this.pagesValidation[this.currentPage].valid;
  }
  public nextPage(): void {
    this.currentPage++;
    this.progressStatus += 100 / this.nbPagesForm;
    this.updatePageValid();
  }
  public previousPage(): void {
    this.currentPage--;
    this.progressStatus -= 100 / this.nbPagesForm;
    this.updatePageValid();
  }
  public showPassword(): void {
    this.isShowPassword = !this.isShowPassword;
  }
  public showConfirmPassword(): void {
    this.isShowConfirmPassword = !this.isShowConfirmPassword;
  }

  public setAddressStructure(address?: Address): void {
    if (address) {
      this.getAddressControl('numero').setValue(address.numero);
      this.getAddressControl('street').setValue(address.street);
      this.getAddressControl('commune').setValue(address.commune);
    } else {
      this.structureForm.get('address').reset();
    }
    this.setValidationsForm();
  }
  public setTypeStructure(type?: string): void {
    this.getStructureControl('structureType').setValue(type);
    this.setValidationsForm();
  }
  public updateHours(form: FormGroup): void {
    this.hoursForm = form;
    this.setValidationsForm();
  }
  public onPmrAccessChange(bool: boolean): void {
    this.getStructureControl('pmrAccess').setValue(bool);
    this.setValidationsForm();
  }
  public toggleWebSite(): void {
    this.showWebsite = !this.showWebsite;
    if (!this.showWebsite) {
      this.getStructureControl('website').reset();
    }
    this.setValidationsForm();
  }
  public toggleSocialNetwork(): void {
    this.showSocialNetwork = !this.showSocialNetwork;
    if (!this.showSocialNetwork) {
      this.getStructureControl('facebook').reset();
      this.getStructureControl('twitter').reset();
      this.getStructureControl('instagram').reset();
    }
    this.setValidationsForm();
  }
}

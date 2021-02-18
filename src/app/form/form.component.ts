import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Structure } from '../models/structure.model';
import { Time } from '../models/time.model';
import { Day } from '../models/day.model';
import { StructureService } from '../services/structure.service';
import { SearchService } from '../structure-list/services/search.service';
import { Category } from '../structure-list/models/category.model';
import { CategoryEnum } from '../shared/enum/category.enum';
import { ProfileService } from '../profile/services/profile.service';
import { User } from '../models/user.model';
import { MustMatch } from '../shared/validator/form';
import { Address } from '../models/address.model';
import { Module } from '../structure-list/models/module.model';
import { Equipment } from '../structure-list/enum/equipment.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';
import { Regex } from '../shared/enum/regex.enum';
import { PageTypeEnum } from './pageType.enum';
import { TempUserService } from '../services/temp-user.service';
const { DateTime } = require('luxon');
@Component({
  selector: 'app-structureForm',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public profile: User;
  public createdStructure: Structure;

  // Form var
  public structureForm: FormGroup;
  public accountForm: FormGroup;
  public hoursForm: FormGroup;
  public editForm: FormGroup;
  public labelsQualifications: Category;
  public publics: Category;
  public accessModality: Category;
  public publicsAccompaniment: Category;
  public proceduresAccompaniment: Category;
  public equipmentsAndServices: { module: Module; openned: boolean }[] = [];
  public trainingCategories: { category: Category; openned: boolean }[] = [];
  public pageTypeEnum = PageTypeEnum;
  public claimStructure: Structure = null;
  public linkedStructureId: Array<string> = null;

  // Page and progress var
  public currentPage = 0;
  public progressStatus = 0;
  public nbPagesForm = 24;
  public isPageValid: boolean;
  public pagesValidation = [];

  // Collapse var
  public showWebsite: boolean;
  public showSocialNetwork: boolean;
  public showPublicsAccompaniment: boolean;
  public showProceduresAccompaniment: boolean;

  // ModalExit var
  public showConfirmationModal = false;
  private resolve: Function;

  // Condition form
  public isShowConfirmPassword = false;
  public isShowPassword = false;
  public userAcceptSavedDate = false;
  public showMenu = false;
  public isEditMode = false;
  public isClaimMode = false;
  public isAccountMode = false;
  public isJoinMode = false;
  public isLoading = false;
  public isWifiChoosen = false;

  constructor(
    private structureService: StructureService,
    private searchService: SearchService,
    private profileService: ProfileService,
    private authService: AuthService,
    private tempUserService: TempUserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.profileService.getProfile().then((user: User) => {
      this.profile = user;
    });
    await this.setCategories();
    // Check if it's a new structure or edit structure
    this.isLoading = false;
    if (history.state.data) {
      this.isEditMode = true;
      this.isWifiChoosen = true;
      this.initForm(new Structure(history.state.data));
    } else if (history.state.newUser) {
      this.isClaimMode = true;
      // Handle join strucutre, the case is very similar to claim
      if (history.state.isJoin) {
        this.isJoinMode = true;
      }
      this.createAccountForm();
      this.claimStructure = history.state.newUser;
      this.setValidationsForm();
    } else {
      this.initForm(new Structure());
    }
    // Handle account creation when pre-register
    this.route.data.subscribe((data) => {
      if (data.user) {
        this.isAccountMode = true;
        this.createAccountForm(data.user.email, data.user.name, data.user.surname);
        this.linkedStructureId = data.user.pendingStructuresLink;
        this.setValidationsForm();
        this.currentPage = PageTypeEnum.accountInfo;
      }
    });
  }

  async setCategories(): Promise<void> {
    this.searchService.getCategoriesAccompaniment().subscribe((categories: Category[]) => {
      this.proceduresAccompaniment = categories[0];
    });
    const equipmentsCategs = await this.searchService.getCategoriesMoreFilters().toPromise();
    equipmentsCategs.forEach((categ) => {
      switch (categ.id) {
        case CategoryEnum.accessModality: {
          this.accessModality = categ;
          break;
        }
        case CategoryEnum.equipmentsAndServices: {
          categ.modules.forEach((c) => {
            this.equipmentsAndServices.push({ module: c, openned: false });
          });
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
    let categs = await this.searchService.getCategoriesTraining().toPromise();
    categs.forEach((categ) => {
      this.trainingCategories.push({ category: categ, openned: false });
    });
  }

  private initForm(structure: Structure): void {
    // Init account Form
    this.createAccountForm();

    // Init form
    this.structureForm = this.createStructureForm(structure);
    this.editForm = this.createStructureForm(structure);

    // Init hours form
    this.hoursForm = new FormGroup({
      monday: this.createDay(structure.hours.monday),
      tuesday: this.createDay(structure.hours.tuesday),
      wednesday: this.createDay(structure.hours.wednesday),
      thursday: this.createDay(structure.hours.thursday),
      friday: this.createDay(structure.hours.friday),
      saturday: this.createDay(structure.hours.saturday),
      sunday: this.createDay(structure.hours.sunday),
    });
    if (this.isEditMode) {
      this.showCollapse(structure);
    }

    this.setValidationsForm();
  }

  private createAccountForm(email?: string, name?: string, surname?: string): void {
    this.accountForm = new FormGroup(
      {
        email: new FormControl(email ? email : '', [Validators.required, Validators.pattern(Regex.email)]),
        name: new FormControl(name ? name : '', [Validators.required, Validators.pattern(Regex.textWithoutNumber)]),
        surname: new FormControl(surname ? surname : '', [
          Validators.required,
          Validators.pattern(Regex.textWithoutNumber),
        ]),
        phone: new FormControl('', [Validators.required, Validators.pattern(Regex.phone)]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/), //NOSONAR
        ]),
        confirmPassword: new FormControl(''),
      },
      [MustMatch('password', 'confirmPassword')]
    );
  }

  private createStructureForm(structure): FormGroup {
    const form = new FormGroup({
      _id: new FormControl(structure._id),
      coord: new FormControl(structure.coord),
      structureType: new FormControl(structure.structureType, Validators.required),
      structureName: new FormControl(structure.structureName, Validators.required),
      description: new FormControl(structure.description),
      lockdownActivity: new FormControl(structure.lockdownActivity),
      address: new FormGroup({
        numero: new FormControl(structure.address.numero),
        street: new FormControl(structure.address.street, Validators.required),
        commune: new FormControl(structure.address.commune, Validators.required),
      }),
      contactMail: new FormControl(structure.contactMail, [Validators.required, Validators.pattern(Regex.email)]),
      contactPhone: new FormControl(structure.contactPhone, [Validators.required, Validators.pattern(Regex.phone)]),
      website: new FormControl(structure.website, Validators.pattern(Regex.website)),
      facebook: new FormControl(structure.facebook, Validators.pattern(Regex.facebook)),
      twitter: new FormControl(structure.twitter, Validators.pattern(Regex.twitter)),
      instagram: new FormControl(structure.instagram, Validators.pattern(Regex.instagram)),
      linkedin: new FormControl(structure.linkedin, Validators.pattern(Regex.linkedIn)),
      hours: new FormGroup({}),
      pmrAccess: new FormControl(structure.pmrAccess, Validators.required),
      exceptionalClosures: new FormControl(structure.exceptionalClosures),
      labelsQualifications: this.loadArrayForCheckbox(structure.labelsQualifications, false),
      accessModality: this.loadArrayForCheckbox(structure.accessModality, true),
      publicsAccompaniment: this.loadArrayForCheckbox(structure.publicsAccompaniment, false),
      proceduresAccompaniment: this.loadArrayForCheckbox(structure.proceduresAccompaniment, false),
      otherDescription: new FormControl(structure.otherDescription),
      equipmentsAndServices: this.loadArrayForCheckbox(structure.equipmentsAndServices, false),
      publics: this.loadArrayForCheckbox(structure.publics, true),
      baseSkills: this.loadArrayForCheckbox(structure.baseSkills, false),
      accessRight: this.loadArrayForCheckbox(structure.accessRight, false),
      parentingHelp: this.loadArrayForCheckbox(structure.parentingHelp, false),
      socialAndProfessional: this.loadArrayForCheckbox(structure.socialAndProfessional, false),
      digitalCultureSecurity: this.loadArrayForCheckbox(structure.digitalCultureSecurity, false),
      nbComputers: new FormControl(
        structure.equipmentsAndServices.includes('ordinateurs') ? structure.nbComputers : 1,
        [Validators.required, Validators.pattern(Regex.noNullNumber)]
      ),
      nbPrinters: new FormControl(structure.equipmentsAndServices.includes('imprimantes') ? structure.nbPrinters : 1, [
        Validators.required,
        Validators.pattern(Regex.noNullNumber),
      ]),
      nbTablets: new FormControl(structure.equipmentsAndServices.includes('tablettes') ? structure.nbTablets : 1, [
        Validators.required,
        Validators.pattern(Regex.noNullNumber),
      ]),
      nbNumericTerminal: new FormControl(
        structure.equipmentsAndServices.includes('bornesNumeriques') ? structure.nbNumericTerminal : 1,
        [Validators.required, Validators.pattern(Regex.noNullNumber)]
      ),
      nbScanners: new FormControl(structure.equipmentsAndServices.includes('scanners') ? structure.nbScanners : 1, [
        Validators.required,
        Validators.pattern(Regex.noNullNumber),
      ]),
      freeWorkShop: new FormControl(structure.freeWorkShop, Validators.required),
    });
    return form;
  }
  private showCollapse(s: Structure): void {
    if (s.website) {
      this.showWebsite = true;
    }
    if (s.facebook || s.twitter || s.instagram || s.linkedin) {
      this.showSocialNetwork = true;
    }
    if (s.publicsAccompaniment.length) {
      this.showPublicsAccompaniment = true;
    }
    if (s.proceduresAccompaniment.length) {
      this.showProceduresAccompaniment = true;
    }
    this.trainingCategories.forEach((categ: { category: Category; openned: boolean }) => {
      categ.openned = false;
      switch (categ.category.id) {
        case 'accessRight':
          if (s.accessRight.length) {
            categ.openned = true;
          }
          break;
        case 'socialAndProfessional':
          if (s.socialAndProfessional.length) {
            categ.openned = true;
          }
          break;
        case 'baseSkills':
          if (s.baseSkills.length) {
            categ.openned = true;
          }
          break;
        case 'parentingHelp':
          if (s.parentingHelp.length) {
            categ.openned = true;
          }
          break;
        case 'digitalCultureSecurity':
          if (s.digitalCultureSecurity.length) {
            categ.openned = true;
          }
          break;
      }
    });
    this.equipmentsAndServices.forEach((equipment: { module: Module; openned: boolean }) => {
      equipment.openned = false;
      switch (equipment.module.id) {
        case 'ordinateurs':
          if (s.equipmentsAndServices.includes('ordinateurs')) {
            equipment.openned = true;
          }
          break;
        case 'tablettes':
          if (s.equipmentsAndServices.includes('tablettes')) {
            equipment.openned = true;
          }
          break;
        case 'bornesNumeriques':
          if (s.equipmentsAndServices.includes('bornesNumeriques')) {
            equipment.openned = true;
          }
          break;
        case 'imprimantes':
          if (s.equipmentsAndServices.includes('imprimantes')) {
            equipment.openned = true;
          }
          break;
        case 'scanners':
          if (s.equipmentsAndServices.includes('scanners')) {
            equipment.openned = true;
          }
          break;
      }
    });
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
      openning: new FormControl(time.openning),
      closing: new FormControl(time.closing),
    });
  }

  public onCheckChange(event: boolean, formControlName: string, value: string): void {
    if (value == 'wifiEnAccesLibre') {
      this.isWifiChoosen = true;
    }
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
  public isInArray(term: string, formControlName: string): boolean {
    if (this.structureForm.controls[formControlName].value) {
      return this.structureForm.controls[formControlName].value.includes(term);
    }
    return false;
  }

  public setValidationsForm(): void {
    if (this.isClaimMode) {
      this.pagesValidation[PageTypeEnum.summary] = { valid: true };
      this.pagesValidation[PageTypeEnum.accountInfo] = {
        valid:
          this.accountForm.get('surname').valid &&
          this.accountForm.get('name').valid &&
          this.accountForm.get('phone').valid,
      };
      this.pagesValidation[PageTypeEnum.accountCredentials] = {
        valid:
          this.accountForm.get('email').valid &&
          this.accountForm.get('password').valid &&
          this.accountForm.get('confirmPassword').valid,
      };
      this.pagesValidation[PageTypeEnum.cgu] = { valid: this.userAcceptSavedDate };
      this.updatePageValid();
    } else if (this.isAccountMode) {
      this.pagesValidation[PageTypeEnum.accountInfo] = {
        valid:
          this.accountForm.get('surname').valid &&
          this.accountForm.get('name').valid &&
          this.accountForm.get('phone').valid,
      };
      this.pagesValidation[PageTypeEnum.accountCredentials] = {
        valid:
          this.accountForm.get('email').valid &&
          this.accountForm.get('password').valid &&
          this.accountForm.get('confirmPassword').valid,
      };
      this.pagesValidation[PageTypeEnum.cgu] = { valid: this.userAcceptSavedDate };
      this.updatePageValid();
    } else {
      this.pagesValidation[PageTypeEnum.summary] = { valid: true };
      this.pagesValidation[PageTypeEnum.info] = { valid: true };
      this.pagesValidation[PageTypeEnum.accountInfo] = {
        valid:
          this.accountForm.get('surname').valid &&
          this.accountForm.get('name').valid &&
          this.accountForm.get('phone').valid,
      };
      this.pagesValidation[PageTypeEnum.accountCredentials] = {
        valid:
          this.accountForm.get('email').valid &&
          this.accountForm.get('password').valid &&
          this.accountForm.get('confirmPassword').valid,
      };
      this.pagesValidation[PageTypeEnum.structureNameAndAddress] = {
        valid: this.getStructureControl('structureName').valid && this.getStructureControl('address').valid,
        name: 'Nom et adresse',
      };
      this.pagesValidation[PageTypeEnum.structurePhone] = {
        valid: this.getStructureControl('contactPhone').valid,
        name: 'Téléphone',
      };
      this.pagesValidation[PageTypeEnum.structureType] = {
        valid: this.getStructureControl('structureType').valid,
        name: 'Type de structure',
      };
      this.pagesValidation[PageTypeEnum.structureAccessModality] = {
        valid: this.getStructureControl('accessModality').valid,
        name: "Modalités d'accueil ",
      };
      this.pagesValidation[PageTypeEnum.structureHours] = { valid: this.hoursForm.valid, name: "Horaires d'ouverture" };
      this.pagesValidation[PageTypeEnum.structureHoursDetails] = {
        valid: this.getStructureControl('exceptionalClosures').valid,
        name: 'Précisions sur les horaires',
      };
      this.pagesValidation[PageTypeEnum.structurePmr] = {
        valid: this.getStructureControl('pmrAccess').valid,
        name: 'Accessibilité pour les personnes à mobilité réduite',
      };
      this.pagesValidation[PageTypeEnum.structureWebAndSocialNetwork] = {
        valid:
          this.getStructureControl('contactMail').valid &&
          (this.getStructureControl('website').valid || !this.showWebsite) &&
          ((this.getStructureControl('facebook').valid &&
            this.getStructureControl('twitter').valid &&
            this.getStructureControl('instagram').valid) ||
            !this.showSocialNetwork),
        name: 'Présence sur internet',
      };
      this.pagesValidation[PageTypeEnum.structurePublicTarget] = {
        valid: this.getStructureControl('publics').valid,
        name: 'Public admis',
      };
      this.pagesValidation[PageTypeEnum.structureAccompaniment] = {
        valid:
          this.getStructureControl('publicsAccompaniment').valid &&
          this.getStructureControl('proceduresAccompaniment').valid,
        name: 'Accompagnements proposés',
      };
      this.pagesValidation[PageTypeEnum.structureOtherAccompaniment] = {
        valid: this.getStructureControl('otherDescription').value,
        name: 'Autres démarches proposés',
      };
      this.pagesValidation[PageTypeEnum.structureWorkshop] = {
        valid:
          this.getStructureControl('accessRight').valid &&
          this.getStructureControl('socialAndProfessional').valid &&
          this.getStructureControl('baseSkills').valid &&
          this.getStructureControl('parentingHelp').valid &&
          this.getStructureControl('digitalCultureSecurity').valid,
        name: 'Ateliers au numérique proposés',
      };
      this.pagesValidation[PageTypeEnum.structureWorkshopPrice] = {
        valid: this.getStructureControl('freeWorkShop').valid,
        name: 'Gratuité des ateliers',
      };
      this.pagesValidation[PageTypeEnum.structureWifi] = {
        valid: this.getStructureControl('equipmentsAndServices').valid && this.isWifiChoosen,
        name: 'Gratuité du wifi',
      };
      this.pagesValidation[PageTypeEnum.structureEquipments] = {
        valid:
          this.getStructureControl('equipmentsAndServices').valid &&
          this.getStructureControl('nbComputers').valid &&
          this.getStructureControl('nbPrinters').valid &&
          this.getStructureControl('nbTablets').valid &&
          this.getStructureControl('nbNumericTerminal').valid &&
          this.getStructureControl('nbScanners').valid,
        name: 'Matériels mis à disposition',
      };
      this.pagesValidation[PageTypeEnum.structureLabels] = {
        valid: this.getStructureControl('labelsQualifications').valid,
        name: 'Labélisations proposées',
      };
      this.pagesValidation[PageTypeEnum.structureOtherServices] = {
        valid: this.getStructureControl('equipmentsAndServices').valid,
        name: 'Autres services proposés',
      };
      this.pagesValidation[PageTypeEnum.structureDescription] = {
        valid: this.getStructureControl('description').valid,
        name: 'Présentation de la structure',
      };
      this.pagesValidation[PageTypeEnum.structureCovidInfo] = {
        valid: this.getStructureControl('lockdownActivity').valid,
        name: 'Informations spécifiques à la période COVID',
      };
      this.pagesValidation[PageTypeEnum.cgu] = { valid: this.userAcceptSavedDate };
      //this.pagesValidation[PageTypeEnum.addUserToStructure] = { valid: true };
      this.updatePageValid();
    }
  }

  private updatePageValid(): void {
    this.isPageValid = this.pagesValidation[this.currentPage].valid;
  }

  /**
   * Page algo for claim structure case
   */
  public nextPageClaim(): void {
    if (this.currentPage == this.nbPagesForm - 1) {
      const user = new User(this.accountForm.value);
      // Create user and claim structure
      this.authService.register(user).subscribe(() => {
        // If joinMode, send join request, if not send claim request;
        if (this.isJoinMode) {
          this.structureService.joinStructure(this.claimStructure._id, user.email).subscribe(() => {
            this.progressStatus = 100;
          });
        } else {
          this.structureService.claimStructureWithAccount(this.claimStructure._id, user).subscribe(() => {
            this.progressStatus = 100;
          });
        }
      });
    }

    if (this.currentPage == PageTypeEnum.summary) {
      this.currentPage = PageTypeEnum.accountInfo;
      this.updatePageValid();
    } else if (this.currentPage == PageTypeEnum.accountInfo) {
      this.currentPage = PageTypeEnum.accountCredentials;
      this.updatePageValid();
    } else if (this.currentPage == PageTypeEnum.accountCredentials) {
      this.currentPage = PageTypeEnum.cgu;
      this.updatePageValid();
    } else if (this.currentPage == PageTypeEnum.cgu) {
      this.currentPage = this.nbPagesForm;
    }

    this.progressStatus += 25;
  }
  /**
   * Page algo for create account case
   */
  public nextPageAccount(): void {
    if (this.currentPage == this.nbPagesForm - 1) {
      const user = new User(this.accountForm.value);
      // Create user with structure
      user.structuresLink = this.linkedStructureId;
      this.authService.register(user).subscribe(() => {
        this.progressStatus = 100;
      });
    }

    if (this.currentPage == PageTypeEnum.accountInfo) {
      this.currentPage = PageTypeEnum.accountCredentials;
      this.updatePageValid();
    } else if (this.currentPage == PageTypeEnum.accountCredentials) {
      this.currentPage = PageTypeEnum.cgu;
      this.updatePageValid();
    } else if (this.currentPage == PageTypeEnum.cgu) {
      this.currentPage = this.nbPagesForm;
    }

    this.progressStatus += 25;
  }

  /**
   * Page algo for claim structure case
   */
  public previousPageClaim(): void {
    if (this.currentPage == PageTypeEnum.accountInfo) {
      this.currentPage = PageTypeEnum.summary;
      this.updatePageValid();
    } else if (this.currentPage == PageTypeEnum.accountCredentials) {
      this.currentPage = PageTypeEnum.accountInfo;
      this.updatePageValid();
    } else if (this.currentPage == PageTypeEnum.cgu) {
      this.currentPage = PageTypeEnum.accountCredentials;
      this.updatePageValid();
    }

    this.progressStatus -= 25;
  }

  /**
   * Page algo for claim structure case
   */
  public previousPageAccount(): void {
    if (this.currentPage == PageTypeEnum.accountCredentials) {
      this.currentPage = PageTypeEnum.accountInfo;
      this.updatePageValid();
    } else if (this.currentPage == PageTypeEnum.cgu) {
      this.currentPage = PageTypeEnum.accountCredentials;
      this.updatePageValid();
    }

    this.progressStatus -= 25;
  }

  public nextPage(): void {
    if (this.isClaimMode) {
      this.nextPageClaim();
    } else if (this.isAccountMode) {
      this.nextPageAccount();
    } else {
      // Check if user already connected to skip accountForm pages.
      if (this.currentPage == PageTypeEnum.info && this.profile) {
        this.currentPage += 2; // Skip accountInfo pages from AccountForm
        this.progressStatus += 2 * (100 / this.nbPagesForm);
      }
      // Check if "other" isn't check to hide "other description" page
      if (
        this.currentPage == PageTypeEnum.structureAccompaniment &&
        !this.isInArray('autres', 'proceduresAccompaniment')
      ) {
        this.currentPage++; // page structureOtherAccompaniment skip and go to page structureWorkshop
        this.progressStatus += 100 / this.nbPagesForm;
      }

      // Check if going to the last page to submit form and send email verification.
      if (this.currentPage == this.nbPagesForm - 1) {
        this.validateForm();
      } else {
        this.currentPage++;
        this.progressStatus += 100 / this.nbPagesForm;
        this.updatePageValid();
      }
    }
  }
  public previousPage(): void {
    if (this.isClaimMode) {
      this.previousPageClaim();
    } else if (this.isAccountMode) {
      this.previousPageAccount();
    } else {
      // Check if user already connected to skip accountForm pages.
      if (this.currentPage == PageTypeEnum.structureNameAndAddress && this.profile) {
        this.currentPage -= 2; // Skip 2 pages from AccountForm
        this.progressStatus -= 2 * (100 / this.nbPagesForm);
      }

      // Check if "other" isn't check to hide "other description" page
      if (this.currentPage == PageTypeEnum.structureWorkshop && !this.isInArray('autres', 'proceduresAccompaniment')) {
        this.currentPage--; // page 14 skip and go to page 13
        this.progressStatus -= 100 / this.nbPagesForm;
      }
      this.currentPage--;
      this.progressStatus -= 100 / this.nbPagesForm;
      this.updatePageValid();
    }
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
  public setHoursError(): void {
    this.hoursForm.setErrors({ formError: true });
    this.setValidationsForm();
  }
  public onRadioBtnChange(controlName: string, bool: boolean): void {
    this.getStructureControl(controlName).setValue(bool);
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
  public updateChoice(choice: string, controlName: string): void {
    this.onCheckChange(!this.isInArray(choice, controlName), controlName, choice);
  }
  public togglePublicsAccompaniment(): void {
    this.showPublicsAccompaniment = !this.showPublicsAccompaniment;
    if (!this.showPublicsAccompaniment) {
      this.getStructureControl('publicsAccompaniment').reset();
    }
    this.setValidationsForm();
  }
  public toggleProceduresAccompaniment(): void {
    this.showProceduresAccompaniment = !this.showProceduresAccompaniment;
    if (!this.showProceduresAccompaniment) {
      this.getStructureControl('proceduresAccompaniment').reset();
    }
    this.setValidationsForm();
  }
  public toggleTrainingCategories(categ: { category: Category; openned: boolean }): void {
    this.trainingCategories.forEach((c: { category: Category; openned: boolean }) => {
      if (categ === c) {
        c.openned = !c.openned;
      }
    });
  }

  public toggleEquipmentsServices(equipment: { module: Module; openned: boolean }): void {
    this.onCheckChange(!equipment.openned, 'equipmentsAndServices', equipment.module.id);
    this.equipmentsAndServices.forEach((e: { module: Module; openned: boolean }) => {
      if (equipment === e) {
        e.openned = !e.openned;
        if (!equipment.openned) {
          switch (e.module.id) {
            case Equipment.computer: {
              this.getStructureControl('nbComputers').setValue(1);
              break;
            }
            case Equipment.printer: {
              this.getStructureControl('nbPrinters').setValue(1);
              break;
            }
            case Equipment.tablet: {
              this.getStructureControl('nbTablets').setValue(1);
              break;
            }
            case Equipment.bornes: {
              this.getStructureControl('nbNumericTerminal').setValue(1);
              break;
            }
            case Equipment.scanner: {
              this.getStructureControl('nbScanners').setValue(1);
              break;
            }
          }
          this.setValidationsForm();
        }
      }
    });
  }
  public acceptDataBeSaved(isAccepted: boolean): void {
    this.userAcceptSavedDate = isAccepted;
    this.setValidationsForm();
  }

  public validateForm(): void {
    if (this.structureForm.valid && this.hoursForm.valid) {
      let structure: Structure = this.structureForm.value;
      structure.hours = this.hoursForm.value;
      let user: User;
      if (this.isEditMode) {
        this.structureService.editStructure(structure).subscribe((s: Structure) => {
          this.createdStructure = this.structureService.updateOpeningStructure(s, DateTime.local());
          this.editForm = this.createStructureForm(s);
        });
      } else {
        if (this.profile) {
          user = this.profile;
          structure.accountVerified = true;
          this.createStructure(structure, user);
        } else {
          if (this.accountForm.valid) {
            user = new User(this.accountForm.value);
            this.authService
              .register(user)
              .pipe(first())
              .subscribe(() => {
                this.createStructure(structure, user);
              });
          }
        }
      }
    }
  }

  private createStructure(structure: Structure, user: User): void {
    this.structureService.createStructure(structure, user).subscribe((structure) => {
      this.currentPage++;
      this.progressStatus += 100 / this.nbPagesForm;
      this.createdStructure = structure;
    });
  }
  public toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  public closeMenu(): void {
    this.showMenu = false;
  }

  public canExit(): Promise<boolean> {
    // Avoid confirmation when user submit form and leave.
    if (this.currentPage == this.nbPagesForm || this.currentPage < 3 || this.isEditMode) {
      return new Promise((resolve) => resolve(true));
    } else {
      return new Promise((resolve) => this.showModal(resolve));
    }
  }

  private showModal(resolve: Function): void {
    this.showConfirmationModal = true;
    this.resolve = resolve;
  }
  public hasRedirectionAccepted(hasAccept: boolean): void {
    this.resolve(hasAccept);
    this.showConfirmationModal = false;
  }

  // Function for editMode only

  public goToSpecificPage(numPage: number, isSave: boolean): void {
    if (isSave) {
      this.validateForm();
    } else {
      const structure = new Structure(this.editForm.value);
      this.structureForm = this.createStructureForm(structure);
      this.showCollapse(structure);
    }
    this.currentPage = numPage;
    this.updatePageValid();
  }

  public closeEditMode(): void {
    this.router.navigateByUrl('home', { state: { data: this.createdStructure } });
  }

  public verifyUserExist(inputEmail): void {
    if (this.accountForm.get('email').valid) {
      this.profileService.isEmailAlreadyUsed(inputEmail).subscribe((isExist) => {
        if (isExist) {
          this.accountForm.get('email').setErrors({ alreadyExist: true });
          this.setValidationsForm();
        }
      });
    }
  }

  public displayAddStructure(): boolean {
    return this.currentPage == this.pageTypeEnum.summary && !this.isEditMode && !this.isClaimMode;
  }

  public displayClaimStructure(): boolean {
    return this.currentPage == this.pageTypeEnum.summary && !this.isEditMode && this.isClaimMode;
  }
}

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Structure } from '../models/structure.model';
import { StructureWithOwners } from '../models/structureWithOwners.model';
import { TempUser } from '../models/temp-user.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { StructureService } from '../services/structure.service';
import { MustMatch } from '../shared/validator/form';
import { CustomRegExp } from '../utils/CustomRegExp';
import { FunctionTypeModalOptions } from './enum/functionTypeModalOptions.enum';
import { TypeModalProfile } from './enum/TypeModalProfile.enum';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  // Password profile
  public formPassword: FormGroup;
  public isShowOldPassword = false;
  public isShowPassword = false;
  public isShowConfirmPassword = false;
  public changePassword = false;
  public passwordError = false;

  // Email profile
  public formEmail: FormGroup;
  public changeEmail = false;

  // formAddAccount
  public formAddAccount: FormGroup;
  public ownerAlreadyLinked = false;

  // Global var
  public userProfile: User;
  public loading = false;
  public structures: StructureWithOwners[] = [];
  public editModal: TypeModalProfile;
  public typeModalProfile = TypeModalProfile;

  // Modal options
  public modalOptsStructureIndex: number;
  public isModalOptsProfile = false;
  public currentStructureOwners: StructureWithOwners;
  public deleteModalStructureOpenned = false;
  public deleteModalAccountOpenned = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private structureService: StructureService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileService.getProfile().then((profile) => {
      this.userProfile = profile;
      this.structures = [];
      profile.structuresLink.forEach((structureId) => {
        this.structureService.getStructureWithOwners(structureId, profile).subscribe((s) => {
          this.structures.push(s);
        });
      });
    });
    this.initForm();
  }
  public initForm(): void {
    this.formPassword = this.formBuilder.group(
      {
        oldPassword: ['', [Validators.required, Validators.pattern(CustomRegExp.PASSWORD)]],
        password: ['', [Validators.required, Validators.pattern(CustomRegExp.PASSWORD)]],
        confirmPassword: [''],
      },
      { validator: MustMatch('password', 'confirmPassword') }
    );

    this.formEmail = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(CustomRegExp.EMAIL)]],
    });

    this.formAddAccount = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(CustomRegExp.EMAIL)]],
    });
  }
  // getter for form fields
  get fpass(): { [key: string]: AbstractControl } {
    return this.formPassword.controls;
  }

  // getter for form fields
  get fmail(): { [key: string]: AbstractControl } {
    return this.formEmail.controls;
  }

  get fAddAccount(): { [key: string]: AbstractControl } {
    return this.formAddAccount.controls;
  }

  public closeModalOpts(functionType: number): void {
    switch (functionType) {
      case FunctionTypeModalOptions.changeEmail:
        this.editModal = TypeModalProfile.email;
        break;
      case FunctionTypeModalOptions.changePassword:
        this.editModal = TypeModalProfile.password;
        break;
      case FunctionTypeModalOptions.deleteAccount:
        this.toggleDeleteAccountModal();
        break;
      case FunctionTypeModalOptions.addUser:
        this.editModal = TypeModalProfile.addAccount;
        this.ownerAlreadyLinked = false;
        break;
      case FunctionTypeModalOptions.removeUser:
        this.editModal = TypeModalProfile.deleteAccount;
        break;
      case FunctionTypeModalOptions.editStructure:
        this.router.navigateByUrl('/create-structure', { state: { data: this.currentStructureOwners.structure } });
        break;
      case FunctionTypeModalOptions.removeStructure:
        this.toggleDeleteStructureModal();
        break;
      default:
        break;
    }
    this.isModalOptsProfile = false;
    this.modalOptsStructureIndex = null;
  }

  // Profile Section
  public closeModalOptsProfile(): void {
    this.editModal = null;
    this.formAddAccount.reset();
    this.formEmail.reset();
    this.formPassword.reset();
  }
  public submitEmail(): void {
    // stop here if form is invalid
    if (this.formEmail.invalid) {
      return;
    }
    this.loading = true;
    this.profileService.changeEmail(this.formEmail.value.email, this.userProfile.email).subscribe(
      () => {
        this.closeModalOptsProfile();
        this.formEmail.reset();
        this.loading = false;
      },
      (err) => {
        this.loading = false;
      }
    );
  }
  public submitPassword(): void {
    // stop here if form is invalid
    if (this.formPassword.invalid) {
      return;
    }
    this.loading = true;

    this.profileService.changePassword(this.formPassword.value.password, this.formPassword.value.oldPassword).subscribe(
      () => {
        this.closeModalOptsProfile();
        this.formPassword.reset();
        this.loading = false;
        this.passwordError = false;
      },
      (error) => {
        this.passwordError = true;
        this.loading = false;
      }
    );
  }
  public openModalOptsProfile(): void {
    this.isModalOptsProfile = true;
  }
  public showOldPassword(): void {
    this.isShowOldPassword = !this.isShowOldPassword;
  }
  public showPassword(): void {
    this.isShowPassword = !this.isShowPassword;
  }
  public showConfirmPassword(): void {
    this.isShowConfirmPassword = !this.isShowConfirmPassword;
  }
  public logout(): void {
    this.authService.logout();
  }
  public deleteAccount(shouldDelete: boolean): void {
    this.toggleDeleteAccountModal();
    if (shouldDelete) {
      this.profileService.deleteProfile().subscribe(() => {
        this.logout();
      });
    }
  }

  // Structure section
  public openModalOptsStructure(index: number, s: StructureWithOwners): void {
    this.modalOptsStructureIndex = index;
    this.currentStructureOwners = s;
  }
  public addStructure(): void {
    this.router.navigateByUrl('/create-structure');
  }
  private toggleDeleteStructureModal(): void {
    this.deleteModalStructureOpenned = !this.deleteModalStructureOpenned;
  }
  private toggleDeleteAccountModal(): void {
    this.deleteModalAccountOpenned = !this.deleteModalAccountOpenned;
  }

  public deleteStructure(shouldDelete: boolean): void {
    this.toggleDeleteStructureModal();
    if (shouldDelete) {
      this.structureService.delete(this.currentStructureOwners.structure._id).subscribe((structure: Structure) => {
        this.ngOnInit();
      });
    }
  }

  public verifyEmailAlreadyUsed(inputEmail, formControl: FormControl): void {
    if (formControl.valid) {
      this.profileService.isEmailAlreadyUsed(inputEmail).subscribe((isExist) => {
        if (isExist) {
          formControl.setErrors({ alreadyExist: true });
        }
      });
    }
  }
  public removeOwner(owner: string): void {
    this.structureService.removeOwnerFromStructure(owner, this.currentStructureOwners.structure._id).subscribe(() => {
      this.currentStructureOwners.owners = this.currentStructureOwners.owners.filter((o) => o.id !== owner);
      if (this.currentStructureOwners.owners.length == 0) {
        this.closeModalOptsProfile();
      }
    });
  }
  public addOwner(): void {
    // stop here if form is invalid
    if (this.formAddAccount.invalid) {
      return;
    }
    this.loading = true;
    const user = new TempUser();
    user.email = this.fAddAccount.email.value;
    this.structureService.addOwnerToStructure(user, this.currentStructureOwners.structure._id).subscribe(
      () => {
        this.closeModalOptsProfile();
        this.formAddAccount.reset();
        this.loading = false;
      },
      (err) => {
        this.ownerAlreadyLinked = true;
        this.loading = false;
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { MustMatch } from '../shared/validator/form';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public form: FormGroup;
  public userProfile: User;
  public submitted = false;
  public changePassword = false;
  public loading = false;
  public changeEmail = false;
  public formEmail: FormGroup;
  public addStructure = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.profileService.getProfile().then((profile) => {
      this.userProfile = profile;
    });
    this.initForm();
  }

  public initForm(): void {
    this.form = this.formBuilder.group(
      {
        oldPassword: [
          '',
          [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)], //NOSONAR
        ],
        password: [
          '',
          [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)], //NOSONAR
        ],
        confirmPassword: [''],
      },
      { validator: MustMatch('password', 'confirmPassword') }
    );
    this.formEmail = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
    });
  }

  // getter for form fields
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public toogleChangePassword(): void {
    this.changePassword = !this.changePassword;
  }
  public toogleAddStructure(): void {
    this.addStructure = !this.addStructure;
  }

  public toogleChangeEmail(): void {
    this.changeEmail = !this.changeEmail;
  }

  public onSubmitEmail(): void {
    this.submitted = true;
    if (this.formEmail.invalid) {
      return;
    }
    this.loading = true;
    this.profileService.changeEmail(this.formEmail.value.email, this.userProfile.email).subscribe(
      () => {
        this.toogleChangeEmail();
        this.loading = false;
      },
      (err) => {
        this.loading = false;
      }
    );
  }
  public onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    this.profileService.changePassword(this.form.value.password, this.form.value.oldPassword).subscribe(
      () => {
        this.toogleChangePassword();
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  public logout(): void {
    this.authService.logout();
  }
}

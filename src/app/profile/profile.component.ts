import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';
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

  constructor(private formBuilder: FormBuilder, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((profile) => {
      this.userProfile = profile;
    });
    this.initForm();
  }

  public initForm(): void {
    this.form = this.formBuilder.group(
      {
        oldPassword: [
          '',
          [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)],
        ],
        password: [
          '',
          [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)],
        ],
        confirmPassword: [''],
      },
      { validator: MustMatch('password', 'confirmPassword') }
    );
  }

  // getter for form fields
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public toogleChangePassword(): void {
    this.changePassword = !this.changePassword;
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
}

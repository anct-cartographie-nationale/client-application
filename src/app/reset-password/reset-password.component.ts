import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MustMatch } from '../shared/validator/form';
import { CustomRegExp } from '../utils/CustomRegExp';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  public resetForm: FormGroup;
  public resetFormChangePassword: FormGroup;
  public token: string;
  public loading = false;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.token = params['token'];
    });

    this.initPasswordForm();
    this.resetForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  private initPasswordForm(): void {
    this.resetFormChangePassword = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.pattern(CustomRegExp.PASSWORD)]],
        confirmPassword: [''],
      },
      { validator: MustMatch('password', 'confirmPassword') }
    );
  }

  // getter for form fields
  get f(): { [key: string]: AbstractControl } {
    return this.resetForm.controls;
  }

  get fPassword(): { [key: string]: AbstractControl } {
    return this.resetFormChangePassword.controls;
  }

  public onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.resetPassword(this.f.email.value).subscribe(
      () => {
        this.router.navigate(['']);
      },
      () => {
        this.loading = false;
      }
    );
  }

  public onSubmitPassword(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetFormChangePassword.invalid) {
      return;
    }

    this.loading = true;
    this.authService.resetPasswordApply(this.token, this.fPassword.password.value).subscribe(
      () => {
        this.router.navigate(['']);
      },
      () => {
        this.loading = false;
      }
    );
  }
}

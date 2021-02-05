import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.scss'],
})
export class SignUpModalComponent implements OnInit {
  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public authFailed = false;
  public returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  @Input() public openned: boolean;
  @Output() closed = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // getter for form fields
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  public closeModal(): void {
    this.closed.emit(true);
  }

  public sendSwitchToSignIn(): void {
    this.closed.emit(false);
  }

  public swithToResetPassword(): void {
    this.closed.emit(true);
    this.router.navigate(['/reset-password']);
  }

  public onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate([this.returnUrl]);
          this.closeModal();
        },
        () => {
          this.loading = false;
          this.authFailed = true;
        }
      );
  }
}

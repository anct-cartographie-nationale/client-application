import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { MustMatch } from '../../validator/form';

@Component({
  selector: 'app-signin-modal',
  templateUrl: './signin-modal.component.html',
  styleUrls: ['./signin-modal.component.scss'],
})
export class SignInModalComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  public submitted = false;
  public success = false;
  public userAlreadyExist = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  @Input() public openned: boolean;
  @Output() closed = new EventEmitter();

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', Validators.required],
        password: [
          '',
          [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)],
        ],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      { validator: MustMatch('password', 'confirmPassword') }
    );
  }

  // getter for form fields
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public closeModal(): void {
    this.closed.emit();
  }

  public onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .register(this.form.value)
      .pipe(first())
      .subscribe(
        () => {
          this.success = true;
        },
        (error) => {
          this.loading = false;
          if (error.error.statusCode === 400) {
            this.userAlreadyExist = true;
          }
        }
      );
  }
}

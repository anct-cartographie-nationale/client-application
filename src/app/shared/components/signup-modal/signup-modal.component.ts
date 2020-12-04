import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  @Input() public openned: boolean;
  @Output() closed = new EventEmitter();

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // getter for form fields
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  public closeModal(): void {
    this.closed.emit();
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
        (data) => {
          //TODO: redirect to ?
        },
        (error) => {
          this.loading = false;
        }
      );
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signin-modal',
  templateUrl: './signin-modal.component.html',
  styleUrls: ['./signin-modal.component.scss'],
})
export class SignInModalComponent implements OnInit {
  public loading = false;
  public submitted = false;
  public success = false;
  public userAlreadyExist = false;

  constructor(private authService: AuthService) {}

  @Input() public openned: boolean;
  @Output() closed = new EventEmitter();

  ngOnInit(): void {}

  public closeModal(): void {
    this.closed.emit();
  }

  public onSubmit(form: FormGroup): void {
    this.submitted = true;

    // stop here if form is invalid
    if (form.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .register(form.value)
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

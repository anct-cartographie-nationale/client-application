import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../profile/services/profile.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.component.html',
})
export class ResetEmailComponent implements OnInit {
  public token: string;
  public changeSuccess = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private authService: AuthService
  ) {
    this.token = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.token) {
      this.changeEmail();
    }
  }

  private changeEmail(): void {
    this.profileService.verifyAndUpdateEmail(this.token).subscribe(
      () => {
        this.changeSuccess = true;
        this.authService.logout();
      },
      (err) => {
        this.changeSuccess = false;
      }
    );
  }
}

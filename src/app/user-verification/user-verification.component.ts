import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.scss'],
})
export class UserVerificationComponent implements OnInit {
  public userId: string;
  public token: string;
  public verificationSuccess = false;
  public verificationIssue = false;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
  }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.sendVerification();
  }

  private sendVerification(): void {
    this.authService.verifyUser(this.userId, this.token).subscribe(
      () => {
        this.verificationSuccess = true;
      },
      () => {
        this.verificationIssue = true;
      }
    );
  }
}

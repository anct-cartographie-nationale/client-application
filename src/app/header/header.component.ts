import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile/services/profile.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public showMenu = false;
  public isPopUpOpen = false;
  public displaySignUp = true;

  constructor(private authService: AuthService, private profileService: ProfileService) {}
  ngOnInit(): void {}

  public openMenu(): void {
    this.showMenu = true;
  }
  public closeMenu(): void {
    this.showMenu = false;
  }

  public get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public logout(): void {
    this.authService.logout();
  }

  public closeSignInModal(): void {
    this.isPopUpOpen = false;
    this.displaySignUp = true;
  }

  public closeSignUpModal(value: boolean): void {
    if (!value) {
      this.displaySignUp = false;
    } else {
      this.isPopUpOpen = false;
    }
  }

  public get isAdmin(): boolean {
    return this.profileService.isAdmin();
  }
}

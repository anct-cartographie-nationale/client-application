import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
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
  public currentRoute = '';
  public formeRoute = '/create-structure';

  constructor(private authService: AuthService, private profileService: ProfileService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }
  ngOnInit(): void {}

  public openMenu(): void {
    this.showMenu = true;
  }
  public closeMenu(route: string): void {
    this.router.navigateByUrl(route);
    this.showMenu = false;
  }

  public get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
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

  public get displayName(): string {
    return this.authService.getUsernameDisplay();
  }

  public displayLogo(): boolean {
    return this.formeRoute !== this.currentRoute;
  }
}

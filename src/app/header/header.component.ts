import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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
  public formRoute = '/create-structure';
  public returnUrl = null;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.verified || params.returnUrl) {
        Promise.resolve().then(() => {
          if (!this.isLoggedIn) {
            this.isPopUpOpen = true;
            this.displaySignUp = true;
          }
        });
        this.returnUrl = params.returnUrl;
      }
    });
  }

  public openMenu(): void {
    this.showMenu = true;
  }
  public closeMenu(): void {
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
    if (this.returnUrl && this.isLoggedIn) {
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  public get isAdmin(): boolean {
    return this.profileService.isAdmin();
  }

  public get displayName(): string {
    return this.authService.getUsernameDisplay();
  }

  public displayLogo(): boolean {
    return this.formRoute !== this.currentRoute;
  }
}

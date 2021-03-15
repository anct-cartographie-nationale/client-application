import { Component } from '@angular/core';
import { ProfileService } from './profile/services/profile.service';
import { AuthService } from './services/auth.service';
import { PrintService } from './shared/service/print.service';
import { WindowScrollService } from './shared/service/windowScroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pamn';

  constructor(
    public printService: PrintService,
    private authService: AuthService,
    private profilService: ProfileService,
    private windowScrollService: WindowScrollService
  ) {
    if (this.authService.isLoggedIn()) {
      this.profilService.getProfile();
    }
    this.setHeightApp();
    window.addEventListener('resize', () => {
      this.setHeightApp();
    });
  }

  private setHeightApp(): void {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  public onScrollDown(event): void {
    this.windowScrollService.scrollY.next(event);
  }
}

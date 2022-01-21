import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ProfileService } from './profile/services/profile.service';
import { AuthService } from './services/auth.service';
import { RouterListenerService } from './services/routerListener.service';
import { PrintService } from './shared/service/print.service';
import { WindowScrollService } from './shared/service/windowScroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pamn';

  constructor(
    public printService: PrintService,
    private authService: AuthService,
    private profilService: ProfileService,
    private windowScrollService: WindowScrollService,
    private routerListener: RouterListenerService,
    private router: Router
  ) {
    if (this.authService.isLoggedIn()) {
      this.profilService.getProfile();
    }
    this.setHeightApp();
    window.addEventListener('resize', () => {
      this.setHeightApp();
    });
    this.routerListener.loadRouting();
  }

  ngOnInit(): void {
    /**
     * Reset scroll to top for article reading
     */
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      document.getElementsByClassName('app-body')[0].scrollTo(0, 0);
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

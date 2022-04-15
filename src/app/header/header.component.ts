import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Structure } from '../models/structure.model';
import { ButtonType } from '../shared/components/button/buttonType.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public showMenu = false;
  public currentRoute = '';
  public formRoute = '/create-structure';
  public dataConsentPendingStructures: Structure[];
  private displayDataShare = false;
  public buttonTypeEnum = ButtonType;

  constructor(
    private router: Router,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  public openMenu(): void {
    this.showMenu = true;
  }
  public closeMenu(): void {
    this.showMenu = false;
  }

  public get isDisplayDataShare(): boolean {
    if (this.displayDataShare) {
      return this.displayDataShare;
    }
    return false;
  }

  public displayLogo(): boolean {
    return this.formRoute !== this.currentRoute;
  }
}

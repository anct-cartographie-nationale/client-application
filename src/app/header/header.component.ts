import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public showMenu = false;

  constructor() {}
  ngOnInit(): void {}

  public openMenu(): void {
    this.showMenu = true;
  }
  public closeMenu(): void {
    this.showMenu = false;
  }
}

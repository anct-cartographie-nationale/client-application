import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './root.layout.html'
})
export class RootLayout implements OnInit {
  public constructor(private readonly router: Router) {}

  public ngOnInit(): void {
    this.router.initialNavigation();
  }
}

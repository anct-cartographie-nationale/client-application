import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './main.layout.html'
})
export class MainLayout {
  currentRoute?: string = '';
  constructor(private router: Router) {
    this.currentRoute = router.url;
  }
}

import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { BRAND_TOKEN, BrandConfiguration } from '../../configuration';

@Component({
  templateUrl: './main.layout.html'
})
export class MainLayout {
  public constructor(
    @Inject(BRAND_TOKEN) public readonly brandConfiguration: BrandConfiguration,
    public readonly router: Router
  ) {}
}

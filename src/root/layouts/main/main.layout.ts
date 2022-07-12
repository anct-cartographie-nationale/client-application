import { Component, Inject } from '@angular/core';
import { BRAND_TOKEN, BrandConfiguration } from '../../configuration';

@Component({
  templateUrl: './main.layout.html'
})
export class MainLayout {
  public constructor(@Inject(BRAND_TOKEN) public readonly brandConfiguration: BrandConfiguration) {}
}

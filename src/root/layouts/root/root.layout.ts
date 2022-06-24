import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DATA_CONFIGURATION, BRAND_CONFIGURATION, POSITION_CONFIGURATION, ZOOM_LEVEL_CONFIGURATION } from '../../configuration';

@Component({
  templateUrl: './root.layout.html'
})
export class RootLayout implements OnInit {
  @Input() set latitude(latitude: string) {
    POSITION_CONFIGURATION.latitude = parseFloat(latitude);
  }

  @Input() set longitude(longitude: string) {
    POSITION_CONFIGURATION.longitude = parseFloat(longitude);
  }

  @Input() set titre(name: string) {
    BRAND_CONFIGURATION.name = name;
  }

  @Input() set logo(logo: string) {
    BRAND_CONFIGURATION.logo = logo;
  }

  @Input() set source(source: string) {
    DATA_CONFIGURATION.lieuxDeMediationNumerique = source;
  }

  @Input() set zoom(zoom: string) {
    ZOOM_LEVEL_CONFIGURATION.regular = parseInt(zoom);
  }

  public constructor(private readonly router: Router) {}

  public ngOnInit(): void {
    this.router.initialNavigation();
  }
}

import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  BRAND_CONFIGURATION,
  DATA_CONFIGURATION,
  FEATURES_TOKEN,
  FeaturesConfiguration,
  POSITION_CONFIGURATION,
  ZOOM_LEVEL_CONFIGURATION
} from '../../../../root';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cartographie-web-component.layout.html'
})
export class CartographieWebComponentLayout implements OnInit {
  @Input() set latitude(latitude: string) {
    POSITION_CONFIGURATION.latitude = parseFloat(latitude);
  }

  @Input() set longitude(longitude: string) {
    POSITION_CONFIGURATION.longitude = parseFloat(longitude);
  }

  @Input() set zoom(zoom: string) {
    ZOOM_LEVEL_CONFIGURATION.regular = parseInt(zoom);
  }

  @Input() set source(source: string) {
    DATA_CONFIGURATION.lieuxDeMediationNumerique = source;
  }

  @Input() set titre(name: string) {
    BRAND_CONFIGURATION.name = name;
  }

  @Input() set sousTitre(sousTitre: string) {
    BRAND_CONFIGURATION.sousTitre = sousTitre;
  }

  @Input() set lienOrientation(lienOrientation: string) {
    this._features.set('orientation', { active: false, url: lienOrientation });
  }

  public constructor(
    @Inject(FEATURES_TOKEN)
    private readonly _features: FeaturesConfiguration,
    private readonly router: Router
  ) {
    _features.set('orientation', { active: false });
  }

  public ngOnInit(): void {
    this.router.initialNavigation();
  }
}

import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BRAND_CONFIGURATION, DATA_CONFIGURATION, FEATURES_TOKEN, FeaturesConfiguration } from '../../../../root';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './orientation-web-component.layout.html'
})
export class OrientationWebComponentLayout implements OnInit {
  @Input() set logo(logo: string) {
    BRAND_CONFIGURATION.logo = logo;
  }

  @Input() set illustration(illustration: string) {
    BRAND_CONFIGURATION.illustration = `svg-${illustration}.svg`;
  }

  @Input() set titre(name: string) {
    BRAND_CONFIGURATION.name = name;
  }

  @Input() set source(source: string) {
    DATA_CONFIGURATION.lieuxDeMediationNumerique = source;
  }

  @Input() set lienCartographie(lienCartographie: string) {
    this._features.set('cartographie', { active: false, url: lienCartographie });
  }

  public constructor(
    @Inject(FEATURES_TOKEN)
    private readonly _features: FeaturesConfiguration,
    private readonly router: Router
  ) {
    _features.set('cartographie', { active: false });
  }

  public ngOnInit(): void {
    this.router.initialNavigation();
  }
}

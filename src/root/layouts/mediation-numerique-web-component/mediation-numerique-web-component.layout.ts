import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BRAND_CONFIGURATION, DATA_CONFIGURATION, POSITION_CONFIGURATION, ZOOM_LEVEL_CONFIGURATION } from '../../configuration';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mediation-numerique-web-component.layout.html'
})
export class MediationNumeriqueWebComponentLayout implements OnInit {
  @Input() set latitude(latitude: string) {
    POSITION_CONFIGURATION.latitude = parseFloat(latitude);
  }

  @Input() set longitude(longitude: string) {
    POSITION_CONFIGURATION.longitude = parseFloat(longitude);
  }

  @Input() set logo(logo: string) {
    BRAND_CONFIGURATION.logo = logo;
  }

  @Input() set logoAvecText(logoAvecText: string) {
    BRAND_CONFIGURATION.logoAvecTexte = logoAvecText;
  }

  @Input() set illustration(illustration: string) {
    BRAND_CONFIGURATION.illustration = `svg-${illustration}.svg`;
  }

  @Input() set titre(name: string) {
    BRAND_CONFIGURATION.name = name;
  }

  @Input() set sousTitre(sousTitre: string) {
    BRAND_CONFIGURATION.sousTitre = sousTitre;
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

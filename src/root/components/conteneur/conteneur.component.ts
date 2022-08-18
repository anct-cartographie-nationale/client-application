import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BRAND_CONFIGURATION, BRAND_TOKEN, BrandConfiguration } from '../../configuration';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-conteneur',
  templateUrl: './conteneur.component.html'
})
export class ConteneurComponent {
  @Input() set logo(logo: string) {
    BRAND_CONFIGURATION.logo = logo;
  }

  @Input() set titre(name: string) {
    BRAND_CONFIGURATION.name = name;
  }

  public constructor(
    @Inject(BRAND_TOKEN) public readonly brandConfiguration: BrandConfiguration,
    public readonly router: Router
  ) {}
}

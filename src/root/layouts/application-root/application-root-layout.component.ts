import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { BRAND_TOKEN, BrandConfiguration } from '../../configuration';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './application-root-layout.component.html'
})
export class ApplicationRootLayout {}

import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ASSETS_CONFIGURATION, ASSETS_TOKEN, mediationNumeriqueProviders } from '../../../../../root';
import { OrientationWebComponentLayout } from '../../../layouts';
import { orientationProviders } from '../../common';
import { OrientationCommonModule } from '../../common/orientation.common.module';
import { OrientationWebComponentRoutingModule } from './orientation.web-component-routing.module';

@NgModule({
  declarations: [OrientationWebComponentLayout],
  imports: [BrowserAnimationsModule, OrientationCommonModule, OrientationWebComponentRoutingModule],
  providers: [
    ...orientationProviders,
    ...mediationNumeriqueProviders,
    {
      provide: ASSETS_TOKEN,
      useValue: ASSETS_CONFIGURATION
    }
  ]
})
export class OrientationWebComponentModule implements DoBootstrap {
  public constructor(private injector: Injector) {
    customElements.define(
      'fr-mediation-numerique-orientation',
      createCustomElement(OrientationWebComponentLayout, { injector })
    );
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  public ngDoBootstrap() {}
}

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { CoordinateursWebComponentLayout } from '../../../layouts';
import { CoordinateursCommonModule } from '../../common/coordinateurs.common.module';
import { CoordinateursWebComponentRoutingModule } from './coordinateurs.web-component-routing.module';
import { ASSETS_CONFIGURATION, ASSETS_TOKEN } from '../../../../../root';
import { coordinateursProviders } from '../../common';

@NgModule({
  declarations: [CoordinateursWebComponentLayout],
  imports: [BrowserAnimationsModule, CoordinateursCommonModule, CoordinateursWebComponentRoutingModule],
  providers: [
    ...coordinateursProviders,
    {
      provide: ASSETS_TOKEN,
      useValue: ASSETS_CONFIGURATION
    }
  ]
})
export class CoordinateursWebComponentModule implements DoBootstrap {
  public constructor(private injector: Injector) {
    customElements.define(
      'fr-mediation-numerique-coordinateurs',
      createCustomElement(CoordinateursWebComponentLayout, { injector })
    );
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  public ngDoBootstrap() {}
}

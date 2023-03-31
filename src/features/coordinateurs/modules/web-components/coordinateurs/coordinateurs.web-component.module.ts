import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { ASSETS_CONFIGURATION, ASSETS_TOKEN, mediationNumeriqueProviders } from '../../../../../root';
import { CoordinateursWebComponentLayout } from '../../../layouts';
import { coordinateursProviders } from '../../common';
import { CoordinateursCommonModule } from '../../common/coordinateurs.common.module';
import { CoordinateursWebComponentRoutingModule } from './coordinateurs.web-component-routing.module';

@NgModule({
  declarations: [CoordinateursWebComponentLayout],
  imports: [BrowserModule, CoordinateursCommonModule, CoordinateursWebComponentRoutingModule],
  providers: [
    ...coordinateursProviders,
    ...mediationNumeriqueProviders,
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

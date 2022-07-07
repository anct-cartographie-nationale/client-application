import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartographieProviders } from '@features/cartographie/infrastructure';
import { OrientationProviders } from '@features/orientation/infrastructure';
import { MainLayout, RootLayout } from '../layouts';
import { RootRoutingModule } from './root-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BRAND_CONFIGURATION, BRAND_TOKEN } from '../configuration';

@NgModule({
  declarations: [MainLayout, RootLayout],
  imports: [BrowserAnimationsModule, RootRoutingModule, HttpClientModule, ReactiveFormsModule],
  entryComponents: [RootLayout],
  providers: [
    ...CartographieProviders,
    ...OrientationProviders,
    {
      provide: BRAND_TOKEN,
      useValue: BRAND_CONFIGURATION
    }
  ]
})
export class RootModule implements DoBootstrap {
  constructor(private injector: Injector) {
    const webComponent = createCustomElement(RootLayout, { injector });
    customElements.define('fr-mediation-numerique', webComponent);
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngDoBootstrap() {}
}

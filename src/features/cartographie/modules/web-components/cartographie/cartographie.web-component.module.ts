import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ASSETS_CONFIGURATION, ASSETS_TOKEN, mediationNumeriqueProviders } from '../../../../../root';
import { SkipLinkModule } from '../../../../core';
import { CartographieWebComponentLayout } from '../../../layouts';
import { cartographieProviders } from '../../common';
import { CartographieCommonModule } from '../../common/cartographie.common.module';
import { CartographieWebComponentRoutingModule } from './cartographie.web-component-routing.module';

@NgModule({
  declarations: [CartographieWebComponentLayout],
  imports: [BrowserAnimationsModule, CartographieCommonModule, CartographieWebComponentRoutingModule, SkipLinkModule.forRoot()],
  providers: [
    ...cartographieProviders,
    ...mediationNumeriqueProviders,
    {
      provide: ASSETS_TOKEN,
      useValue: ASSETS_CONFIGURATION
    }
  ]
})
export class CartographieWebComponentModule implements DoBootstrap {
  public constructor(private injector: Injector) {
    customElements.define(
      'fr-mediation-numerique-cartographie',
      createCustomElement(CartographieWebComponentLayout, { injector })
    );
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  public ngDoBootstrap() {}
}

import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootRoutingModule } from './root-routing.module';
import { MainLayout, RootLayout } from '../layouts';
import { SearchService, StructureService } from '../../features/cartographie/infrastructure/repositories/http';
import { STRUCTURE_TOKEN, SEARCH_TOKEN } from '@gouvfr-anct/mediation-numerique';

@NgModule({
  declarations: [MainLayout, RootLayout],
  imports: [BrowserAnimationsModule, RootRoutingModule],
  entryComponents: [RootLayout],
  providers: [
    {
      provide: SEARCH_TOKEN,
      useClass: SearchService
    },
    {
      provide: STRUCTURE_TOKEN,
      useClass: StructureService
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

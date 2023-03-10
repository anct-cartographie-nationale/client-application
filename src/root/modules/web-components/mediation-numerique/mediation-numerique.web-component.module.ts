import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { ConteneurComponent } from '../../../components';
import { MediationNumeriqueWebComponentLayout } from '../../../layouts/mediation-numerique-web-component/mediation-numerique-web-component.layout';
import { MediationNumeriqueCommonModule } from '../../common/mediation-numerique.common.module';
import { MediationNumeriqueWebComponentRoutingModule } from './mediation-numerique.web-component-routing.module';
import { ASSETS_CONFIGURATION, ASSETS_TOKEN } from '../../../configuration';

@NgModule({
  declarations: [MediationNumeriqueWebComponentLayout],
  imports: [MediationNumeriqueWebComponentRoutingModule, MediationNumeriqueCommonModule],
  providers: [
    {
      provide: ASSETS_TOKEN,
      useValue: ASSETS_CONFIGURATION
    }
  ]
})
export class MediationNumeriqueWebComponentModule implements DoBootstrap {
  public constructor(private injector: Injector) {
    customElements.define('fr-mediation-numerique-conteneur', createCustomElement(ConteneurComponent, { injector }));
    customElements.define('fr-mediation-numerique', createCustomElement(MediationNumeriqueWebComponentLayout, { injector }));
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  public ngDoBootstrap() {}
}

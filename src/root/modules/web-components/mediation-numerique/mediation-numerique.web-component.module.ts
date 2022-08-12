import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { MediationNumeriqueWebComponentLayout } from '../../../layouts';
import { ConteneurComponent } from '../../../components';
import { MediationNumeriqueCommonModule } from '../../common/mediation-numerique.common.module';
import { MediationNumeriqueWebComponentRoutingModule } from './mediation-numerique.web-component-routing.module';

@NgModule({
  declarations: [MediationNumeriqueWebComponentLayout],
  imports: [MediationNumeriqueWebComponentRoutingModule, MediationNumeriqueCommonModule]
})
export class MediationNumeriqueWebComponentModule implements DoBootstrap {
  public constructor(private injector: Injector) {
    customElements.define('fr-mediation-numerique-conteneur', createCustomElement(ConteneurComponent, { injector }));
    customElements.define('fr-mediation-numerique', createCustomElement(MediationNumeriqueWebComponentLayout, { injector }));
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  public ngDoBootstrap() {}
}

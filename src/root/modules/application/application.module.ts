import { NgModule } from '@angular/core';
import { ApplicationRootLayout } from '../../layouts/application-root/application-root-layout.component';
import { MediationNumeriqueCommonModule } from '../common/mediation-numerique.common.module';
import { ApplicationRoutingModule } from './application-routing.module';

@NgModule({
  declarations: [ApplicationRootLayout],
  imports: [ApplicationRoutingModule, MediationNumeriqueCommonModule],
  bootstrap: [ApplicationRootLayout]
})
export class ApplicationModule {}

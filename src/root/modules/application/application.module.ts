import { NgModule } from '@angular/core';
import { ApplicationRootLayout } from '../../layouts/application-root/application-root-layout.component';
import { MediationNumeriqueCommonModule } from '../common/mediation-numerique.common.module';
import { ApplicationRoutingModule } from './application-routing.module';
import { BRAND_APPLICATION_CONFIGURATION, BRAND_TOKEN } from '../../configuration';

@NgModule({
  declarations: [ApplicationRootLayout],
  imports: [ApplicationRoutingModule, MediationNumeriqueCommonModule],
  providers: [
    {
      provide: BRAND_TOKEN,
      useValue: BRAND_APPLICATION_CONFIGURATION
    }
  ],
  bootstrap: [ApplicationRootLayout]
})
export class ApplicationModule {}

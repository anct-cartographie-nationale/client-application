import { NgModule } from '@angular/core';
import { MatomoModule } from 'ngx-matomo';
import { ApplicationRootLayout } from '../../layouts/application-root/application-root-layout.component';
import { MediationNumeriqueCommonModule } from '../common/mediation-numerique.common.module';
import { ApplicationRoutingModule } from './application-routing.module';
import { BRAND_APPLICATION_CONFIGURATION, BRAND_TOKEN } from '../../configuration';

@NgModule({
  declarations: [ApplicationRootLayout],
  imports: [
    ApplicationRoutingModule,
    MediationNumeriqueCommonModule,
    MatomoModule.forRoot({
      scriptUrl: 'https://stats.data.gouv.fr/piwik.js',
      trackers: [{ trackerUrl: 'https://stats.data.gouv.fr/piwik.php', siteId: 277 }],
      routeTracking: { enable: true }
    })
  ],
  providers: [
    {
      provide: BRAND_TOKEN,
      useValue: BRAND_APPLICATION_CONFIGURATION
    }
  ],
  bootstrap: [ApplicationRootLayout]
})
export class ApplicationModule {}

import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatomoModule } from 'ngx-matomo';
import { setTitleAction } from '../../actions';
import { ApplicationRootLayout } from '../../layouts/application-root/application-root-layout.component';
import {
  ASSETS_APPLICATION_CONFIGURATION,
  ASSETS_TOKEN,
  BRAND_APPLICATION_CONFIGURATION,
  BRAND_TOKEN
} from '../../configuration';
import { setTitleActionProvider } from '../../providers';
import { MediationNumeriqueCommonModule } from '../common/mediation-numerique.common.module';
import { ApplicationRoutingModule } from './application-routing.module';

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
      provide: ASSETS_TOKEN,
      useValue: ASSETS_APPLICATION_CONFIGURATION
    },
    {
      provide: BRAND_TOKEN,
      useValue: BRAND_APPLICATION_CONFIGURATION
    }
  ],
  bootstrap: [ApplicationRootLayout]
})
export class ApplicationModule {}

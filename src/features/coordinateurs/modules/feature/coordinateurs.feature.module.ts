import { NgModule } from '@angular/core';
import { ASSETS_APPLICATION_CONFIGURATION, ASSETS_TOKEN } from '../../../../root';
import { CoordinateursCommonModule } from '../common/coordinateurs.common.module';
import { CoordinateursFeatureRoutingModule } from './coordinateurs.feature-routing.module';

@NgModule({
  imports: [CoordinateursCommonModule, CoordinateursFeatureRoutingModule],
  providers: [
    {
      provide: ASSETS_TOKEN,
      useValue: ASSETS_APPLICATION_CONFIGURATION
    }
  ]
})
export class CoordinateursFeatureModule {}

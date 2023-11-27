import { NgModule } from '@angular/core';
import { CoordinateursCommonModule } from '../common/coordinateurs.common.module';
import { CoordinateursFeatureRoutingModule } from './coordinateurs.feature-routing.module';

@NgModule({
  imports: [CoordinateursCommonModule, CoordinateursFeatureRoutingModule]
})
export class CoordinateursFeatureModule {}

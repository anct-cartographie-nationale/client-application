import { NgModule } from '@angular/core';
import { OrientationFeatureRoutingModule } from './orientation.feature-routing.module';
import { OrientationCommonModule } from '../common/orientation.common.module';

@NgModule({
  imports: [OrientationCommonModule, OrientationFeatureRoutingModule]
})
export class OrientationFeatureModule {}

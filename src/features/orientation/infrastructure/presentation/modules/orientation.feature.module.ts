import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrientationLayout } from '../layouts';
import { OrientationFeatureRoutingModule } from './orientation.feature-routing.module';

@NgModule({
  declarations: [OrientationLayout],
  imports: [OrientationFeatureRoutingModule, CommonModule]
})
export class OrientationFeatureModule {}

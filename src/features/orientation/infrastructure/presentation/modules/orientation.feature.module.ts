import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrientationLayout } from '../layouts';
import { CollapseComponent } from '../components/collapse';
import { OrientationFeatureRoutingModule } from './orientation.feature-routing.module';
import { BesoinPage, DatePage, DemarrerPage, LocalisationPage, SpecificitePage } from '../pages';

@NgModule({
  declarations: [OrientationLayout, BesoinPage, DatePage, DemarrerPage, LocalisationPage, SpecificitePage, CollapseComponent],
  imports: [OrientationFeatureRoutingModule, CommonModule]
})
export class OrientationFeatureModule {}

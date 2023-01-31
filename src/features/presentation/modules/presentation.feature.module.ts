import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentationFeatureRoutingModule } from './presentation.feature-routing.module';
import { CarouselComponent } from '../components';
import { PresentationLayout } from '../pages';

@NgModule({
  declarations: [PresentationLayout, CarouselComponent],
  imports: [PresentationFeatureRoutingModule, CommonModule]
})
export class PresentationFeatureModule {}

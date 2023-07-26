import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../components';
import { PresentationPage } from '../pages';
import { PresentationFeatureRoutingModule } from './presentation.feature-routing.module';

@NgModule({
  declarations: [PresentationPage, CarouselComponent],
  imports: [PresentationFeatureRoutingModule, CommonModule]
})
export class PresentationFeatureModule {}

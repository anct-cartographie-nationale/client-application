import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PresentationLayout } from '../layouts';
import { PresentationFeatureRoutingModule } from './presentation.feature-routing.module';
import { CarouselComponent } from '../components/carousel/carousel.component';

@NgModule({
  declarations: [PresentationLayout, CarouselComponent],
  imports: [PresentationFeatureRoutingModule, CommonModule, ReactiveFormsModule]
})
export class PresentationFeatureModule {}

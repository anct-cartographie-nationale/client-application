import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkipLinkModule } from '../../core';
import { CarouselComponent } from '../components';
import { PresentationPage } from '../pages';
import { PresentationFeatureRoutingModule } from './presentation.feature-routing.module';

@NgModule({
  declarations: [PresentationPage, CarouselComponent],
  imports: [PresentationFeatureRoutingModule, CommonModule, SkipLinkModule]
})
export class PresentationFeatureModule {}

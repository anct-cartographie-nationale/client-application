import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkipLinkModule } from '../../core';
import { CarouselComponent, IntegrateursComponent } from '../components';
import { PresentationPage } from '../pages';
import { PresentationFeatureRoutingModule } from './presentation.feature-routing.module';

@NgModule({
  declarations: [PresentationPage, CarouselComponent, IntegrateursComponent],
  imports: [PresentationFeatureRoutingModule, CommonModule, SkipLinkModule]
})
export class PresentationFeatureModule {}

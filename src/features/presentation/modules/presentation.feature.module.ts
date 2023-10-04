import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkipLinkModule } from '../../core';
import { CarouselComponent, ChiffresCleComponent, IntegrateursComponent } from '../components';
import { PresentationPage } from '../pages';
import { PresentationFeatureRoutingModule } from './presentation.feature-routing.module';
import { CollapseModule } from '../../core/components';
import { WebinaireComponent } from '../components/webinaire/webinaire.component';

@NgModule({
  declarations: [PresentationPage, CarouselComponent, ChiffresCleComponent, IntegrateursComponent, WebinaireComponent],
  imports: [PresentationFeatureRoutingModule, CommonModule, SkipLinkModule, CollapseModule]
})
export class PresentationFeatureModule {}

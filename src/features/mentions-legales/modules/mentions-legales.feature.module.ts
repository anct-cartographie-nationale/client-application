import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MentionsLegalesFeatureRoutingModule } from './mentions-legales.feature-routing.module';
import { MentionsLegalesPage } from '../pages';

@NgModule({
  declarations: [MentionsLegalesPage],
  imports: [MentionsLegalesFeatureRoutingModule, CommonModule]
})
export class MentionsLegalesFeatureModule {}

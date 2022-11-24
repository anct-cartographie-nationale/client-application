import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MentionsLegalesFeatureRoutingModule } from './mentions-legales.feature-routing.module';
import { MentionsLegalesLayout } from '../pages';

@NgModule({
  declarations: [MentionsLegalesLayout],
  imports: [MentionsLegalesFeatureRoutingModule, CommonModule]
})
export class MentionsLegalesFeatureModule {}

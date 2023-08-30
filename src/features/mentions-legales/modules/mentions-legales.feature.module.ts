import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkipLinkModule } from '../../core';
import { MentionsLegalesPage } from '../pages';
import { MentionsLegalesFeatureRoutingModule } from './mentions-legales.feature-routing.module';

@NgModule({
  declarations: [MentionsLegalesPage],
  imports: [MentionsLegalesFeatureRoutingModule, CommonModule, SkipLinkModule]
})
export class MentionsLegalesFeatureModule {}
